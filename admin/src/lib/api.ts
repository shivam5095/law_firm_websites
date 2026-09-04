const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

export async function adminRequest<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'An error occurred.',
      errors: data.errors || [],
    };
  }

  return data as T;
}

export const adminApi = {
  get: <T = any>(path: string, options?: RequestInit) =>
    adminRequest<T>(path, { ...options, method: 'GET' }),
  
  post: <T = any>(path: string, body: any, options?: RequestInit) =>
    adminRequest<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  patch: <T = any>(path: string, body: any, options?: RequestInit) =>
    adminRequest<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  
  delete: <T = any>(path: string, options?: RequestInit) =>
    adminRequest<T>(path, { ...options, method: 'DELETE' }),
};

export async function downloadAdminFile(path: string, defaultName: string): Promise<void> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const token = getAuthToken();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
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

