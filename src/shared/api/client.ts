import { useAuthStore } from '@/shared/stores';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | any[];
  params?: Record<string, string | number | boolean | undefined>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let errorCode: string | undefined;

    try {
      const errorData = (await response.json()) as { message?: string; code?: string };
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    // Handle 401 - Unauthorized
    if (response.status === 401) {
      useAuthStore.getState().logout();
    }

    throw new ApiClientError(errorMessage, response.status, errorCode);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

function getHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers(customHeaders);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add auth token if available
  const token = useAuthStore.getState().token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

export const apiClient = {
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params, headers, body, ...rest } = options;
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(headers),
      ...rest,
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, params, headers, ...rest } = options;
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, params, headers, ...rest } = options;
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    return handleResponse<T>(response);
  },

  async patch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, params, headers, ...rest } = options;
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params, headers, body, ...rest } = options;
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(headers),
      ...rest,
    });

    return handleResponse<T>(response);
  },
};

export default apiClient;
