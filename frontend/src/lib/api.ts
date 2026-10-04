const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is missing. Configure it before making API requests.');
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: unknown[]
  ) {
    super(message);
    this.name = 'ApiRequestError';
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

export async function apiRequest<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(path);

  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  const data: unknown = await response.json();

  if (!response.ok) {
    const payload = getErrorPayload(data);
    throw new ApiRequestError(
      payload.message || 'An error occurred during the request.',
      response.status,
      payload.errors
    );
  }

  return data as T;
}

export const api = {
  get: <T = unknown>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),

  post: <T = unknown>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T = unknown>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T = unknown>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};

export async function submitCareerApplication(formData: FormData): Promise<{ success: boolean; message: string }> {
  const url = getApiUrl('/careers/apply');
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    const payload = getErrorPayload(data);
    throw new ApiRequestError(
      payload.message || 'An error occurred during the request.',
      response.status,
      payload.errors
    );
  }

  return data as { success: boolean; message: string };
}
