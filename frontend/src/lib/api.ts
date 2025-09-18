// frontend/src/lib/api.ts
import axios from 'axios';

export const API_BASE =import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Optional helpers that return data directly
export const http = {
  get:    async <T>(url: string) => (await api.get<T>(url)).data,
  post:   async <T>(url: string, body?: unknown) => (await api.post<T>(url, body)).data,
  patch:  async <T>(url: string, body?: unknown) => (await api.patch<T>(url, body)).data,
  delete: async   (url: string) => { await api.delete(url); },
};

export default api;
