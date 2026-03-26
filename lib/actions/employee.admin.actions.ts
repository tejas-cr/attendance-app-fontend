'use server';

import { createServerApi } from '@/lib/axios.server';

export async function getEmployessAdmin() {
  const api = createServerApi();
  const response = await api.get('/admin/users');

  // `adminService.getAllUsers()` returns `response.data.data`, so keep shape compatible.
  return response.data.data;
}