export interface User {
  id: string;
  name: string;
  email: string;
  hasAccess: boolean;
  subscription?: {
    type: 'basic' | 'premium';
    expiresAt: Date;
    isActive: boolean;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration: number; // в секундах
  isFavorite: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  lessonsCount: number;
  coverImage?: string;
}

export interface SearchResult {
  lessons: Lesson[];
  categories: Category[];
}

export interface NavigationTab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface AppState {
  user: User | null;
  lessons: Lesson[];
  favorites: string[]; // lesson ids
  currentTab: string;
  searchQuery: string;
  isLoading: boolean;
}

export type HomeSection = 'lessons' | 'streams' | 'prompts' | 'tools';