import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  auth0Id: string;
  name: string | null;
  email: string | null;
  lastLoginDate: Date;
  createdAt: Date;
  updatedAt: Date;
  theme?: string;
  settings?: UserSettings;
  subscription?: Subscription;
}

export interface UserSettings {
  theme: string;
  notifications: boolean;
  emailPreferences: {
    daily: boolean;
    weekly: boolean;
    marketing: boolean;
  };
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
}

export interface Task {
  _id?: ObjectId;
  userId: string;
  text: string;
  isPriority: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  priority: PriorityLevel;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskUpdate {
  text?: string;
  isPriority?: boolean;
  isCompleted?: boolean;
  completedAt?: Date;
  priority?: PriorityLevel;
  dueDate?: Date;
  tags?: string[];
}

export type PriorityLevel = "high" | "medium" | "low";

export type ThemeOption =
  | "lofi"
  | "emerald"
  | "forest"
  | "synthwave"
  | "garden"
  | "dracula"
  | "fantasy"
  | "cmyk"
  | "autumn"
  | "business"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface TaskStats {
  total: number;
  completed: number;
  priority: number;
  overdue: number;
}

// Component Props Types
export interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, update: TaskUpdate) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  priorityTasks?: Task[];
}

export interface PriorityTasksProps {
  tasks: Task[];
  onUpdateTask: (id: string, update: TaskUpdate) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

export interface CompletedTasksProps {
  tasks: Task[];
  onUpdateTask: (id: string, update: TaskUpdate) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

export interface TaskInputProps {
  onAddTask: (text: string) => Promise<void>;
  isLoading?: boolean;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

// Auth Types
export interface Auth0User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

export interface Session {
  user: Auth0User;
  accessToken: string;
  idToken: string;
  error?: string;
}

// API Request Types
export interface CreateTaskRequest {
  text: string;
  userId: string;
  priority?: PriorityLevel;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTaskRequest {
  id: string;
  update: TaskUpdate;
}

export interface UpdateUserSettingsRequest {
  userId: string;
  settings: Partial<UserSettings>;
}

// Error Types
export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export interface Subscription {
  _id?: ObjectId;
  userId: string;
  status: SubscriptionStatus;
  product_id: string | null;
  variantId: string | null;
  lemonSqueezyId: string | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionStatus =
  | "active"
  | "inactive"
  | "past_due"
  | "cancelled";
