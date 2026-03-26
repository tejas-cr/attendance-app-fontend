'use server';

import axios from 'axios';
import { createServerBearerApi, API_URL } from '@/lib/axios.server';

export async function getEmployessAdmin(accessToken: string, refreshToken: string) {
  const api = await createServerBearerApi(accessToken);

  try {
    const response = await api.get('/admin/users');
    return response.data.data;
  } catch (error: any) {
    if (error?.response?.status === 401 && refreshToken) {
      const refreshResponse = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: {
            'x-refresh-token': refreshToken,
          },
        }
      );

      const maybeData = refreshResponse.data;
      const newAccessToken =
        maybeData?.data?.access_token ?? maybeData?.access_token;
      const newRefreshToken =
        maybeData?.data?.refresh_token ?? maybeData?.refresh_token;

      if (newAccessToken) {
        const retryApi = await createServerBearerApi(newAccessToken);
        const retryResponse = await retryApi.get('/admin/users');

        return {
          ...retryResponse.data.data,
          ...(newAccessToken ? { access_token: newAccessToken } : {}),
          ...(newRefreshToken ? { refresh_token: newRefreshToken } : {}),
        };
      }
    }

    throw error;
  }
}