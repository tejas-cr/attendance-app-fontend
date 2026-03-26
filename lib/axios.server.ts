import 'server-only';

import axios, { AxiosInstance } from 'axios';
import { headers } from 'next/headers';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Creates an Axios client for server-to-server calls.
 * It forwards the incoming request's `cookie` header to the backend so
 * HTTP-only auth cookies are included.
 */
export async function createServerApi(): Promise<AxiosInstance> {
  const cookie = (await headers()).get('cookie') ?? '';

  return axios.create({
    baseURL: API_URL,
    withCredentials: true, // harmless on Node; we still forward Cookie explicitly
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });
}

export function createServerBearerApi(accessToken: string): AxiosInstance {
  const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  });
}

