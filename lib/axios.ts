import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => {
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
        await api.post('/auth/refresh');
        
        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle session expiration
        // In a real app, you might want to redirect via Next.js router or window.location
        if (typeof window !== 'undefined') {
             // Optional: emit an event or redirect
             // window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
