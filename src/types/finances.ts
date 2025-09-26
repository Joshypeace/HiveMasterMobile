// /src/types/finances.ts
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  relatedEntity?: RelatedEntity;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RelatedEntity {
  type: 'harvest' | 'apiary' | 'hive' | 'equipment';
  id: string;
  name: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  relatedEntity?: RelatedEntity;
  notes?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  monthlyTrends: MonthlyTrend[];
  categoryBreakdown: CategoryBreakdown[];
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  type: 'income' | 'expense';
}