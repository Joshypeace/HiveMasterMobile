// /src/types/auth.ts
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'admin';
  subscription?: Subscription;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'farmer' | 'admin';
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  maxHives: number;
  maxApiaries: number;
}

export type SubscriptionPlan = 'basic' | 'pro' | 'enterprise';