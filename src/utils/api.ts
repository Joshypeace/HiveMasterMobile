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

// src/utils/api.ts
// Add these functions to your existing api.ts file

export const fetchHarvests = async (): Promise<Harvest[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      date: '2024-01-15',
      apiaryName: 'North Field Apiary',
      hivesCount: 12,
      totalYield: 45.5,
      notes: 'Excellent honey flow this season'
    },
    {
      id: '2',
      date: '2024-01-10',
      apiaryName: 'South Meadow Apiary',
      hivesCount: 8,
      totalYield: 32.2,
      notes: 'Good harvest despite rainy weather'
    },
  ];
};

export const fetchTasks = async (): Promise<Task[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      title: 'Inspect hive health in North Field',
      description: 'Check for mites and overall hive condition',
      priority: 'high',
      dueDate: '2024-01-20',
      completed: false
    },
    {
      id: '2',
      title: 'Add new supers to strong hives',
      description: 'Monitor honey production and add supers as needed',
      priority: 'medium',
      dueDate: '2024-01-25',
      completed: true
    },
  ];
};

export const fetchNotes = async (): Promise<Note[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      title: 'Queen bee observation',
      content: 'Noticed the queen is laying well. Brood pattern looks healthy and consistent across frames.',
      date: '2024-01-18',
      type: 'inspection'
    },
    {
      id: '2',
      title: 'Weather impact notes',
      content: 'Recent rainfall has affected nectar flow. Bees are staying closer to the hive.',
      date: '2024-01-16',
      type: 'general'
    },
  ];
};

export const updateTask = async (task: { id: string; completed: boolean }): Promise<Task> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...task } as Task;
};