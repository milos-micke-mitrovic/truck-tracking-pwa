import { useAuthStore } from '@/shared/stores';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const TOKEN_REFRESH_THRESHOLD_MS = 60_000;

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

let refreshPromise: Promise<void> | null = null;

async function ensureFreshToken(): Promise<void> {
  const { token, refreshToken, expiresAt, setToken, logout } = useAuthStore.getState();
  if (!token || !refreshToken || !expiresAt) return;

  const timeUntilExpiry = expiresAt - Date.now();
  if (timeUntilExpiry > TOKEN_REFRESH_THRESHOLD_MS) return;

  if (refreshPromise) {
    await refreshPromise;
    return;
  }

  refreshPromise = (async () => {
    try {
      const url = buildUrl('/auth/refresh');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        logout();
        return;
      }

      const data = (await response.json()) as {
        accessToken: string;
        expiresIn: number;
      };
      setToken(data.accessToken, data.expiresIn);
    } catch {
      logout();
    } finally {
      refreshPromise = null;
    }
  })();

  await refreshPromise;
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

    if (response.status === 401) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        try {
          await ensureFreshToken();
        } catch {
          useAuthStore.getState().logout();
        }
      } else {
        useAuthStore.getState().logout();
      }
    }

    throw new ApiClientError(errorMessage, response.status, errorCode);
  }

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

  const token = useAuthStore.getState().token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

function getAuthHeader(): Headers {
  const headers = new Headers();
  const token = useAuthStore.getState().token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

export const apiClient = {
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    await ensureFreshToken();
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
    await ensureFreshToken();
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

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    await ensureFreshToken();
    const url = buildUrl(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    await ensureFreshToken();
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
    await ensureFreshToken();
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
    await ensureFreshToken();
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
