import { QueryFunction } from 'react-query';

const API_BASE_URL = 'https://your-nextjs-api.com/api';

type ApiResponse<T> = {
  data: T;
  error?: string;
};

export const fetchDashboardData: QueryFunction<any> = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

export const fetchApiaries: QueryFunction<any> = async () => {
  const response = await fetch(`${API_BASE_URL}/apiaries`);
  if (!response.ok) {
    throw new Error('Failed to fetch apiaries');
  }
  return response.json();
};

export const fetchHiveDetails: QueryFunction<any, ['hive', string]> = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await fetch(`${API_BASE_URL}/hives/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch hive details');
  }
  return response.json();
};

export const getAuthSession = async (): Promise<AuthSession | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      credentials: 'include',
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch session', error);
    return null;
  }
};

export const login = async (email: string, password: string): Promise<AuthSession> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};