import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => {
    if (typeof window !== 'undefined') {
      const accessToken =
        response.data?.access_token ?? response.data?.data?.access_token;
      const refreshToken =
        response.data?.refresh_token ?? response.data?.data?.refresh_token;

      if (accessToken) window.localStorage.setItem('access_token', accessToken);
      if (refreshToken) window.localStorage.setItem('refresh_token', refreshToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;


    // Determine if the error is a 401 and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken =
          typeof window !== 'undefined'
            ? window.localStorage.getItem('refresh_token')
            : null;

        if (!refreshToken) {
          return Promise.reject(error);
        }

        await api.post('/auth/refresh', {}, { 
          headers: {
            'x-refresh-token': refreshToken,
          },
        });
        
        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle session expiration
        if (typeof window !== 'undefined') {
             if (window.location.pathname !== '/sign-in') {
                 window.location.href = '/sign-in';
             }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
