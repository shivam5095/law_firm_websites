const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is missing. Configure it before making API requests.');
}

export class AdminApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: unknown[]
  ) {
    super(message);
    this.name = 'AdminApiRequestError';
  }
}

function getApiUrl(path: string): string {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }
  return `${API_URL.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

function getErrorPayload(data: unknown): { message?: string; errors: unknown[] } {
  if (typeof data !== 'object' || data === null) {
    return { errors: [] };
  }
  const payload = data as Record<string, unknown>;
  return {
    message: typeof payload.message === 'string' ? payload.message : undefined,
    errors: Array.isArray(payload.errors) ? payload.errors : [],
  };
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}

export async function adminRequest<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(path);
  
  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  
  if (response.status === 401 && path !== '/auth/login') {
    clearAuthToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  const data: unknown = await response.json();

  if (!response.ok) {
    const payload = getErrorPayload(data);
    throw new AdminApiRequestError(
      payload.message || 'An error occurred.',
      response.status,
      payload.errors
    );
  }

  return data as T;
}

export const adminApi = {
  get: <T = unknown>(path: string, options?: RequestInit) =>
    adminRequest<T>(path, { ...options, method: 'GET' }),
  
  post: <T = unknown>(path: string, body: unknown, options?: RequestInit) =>
    adminRequest<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  patch: <T = unknown>(path: string, body: unknown, options?: RequestInit) =>
    adminRequest<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  
  delete: <T = unknown>(path: string, options?: RequestInit) =>
    adminRequest<T>(path, { ...options, method: 'DELETE' }),
};

export async function downloadAdminFile(path: string, defaultName: string): Promise<void> {
  const url = getApiUrl(path);
  const token = getAuthToken();

  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  if (!response.ok) {
    throw new Error('Failed to download document.');
  }

  let filename = defaultName;
  const disposition = response.headers.get('Content-Disposition');
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) { 
      filename = matches[1].replace(/['"]/g, '');
    }
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blobUrl);
}
