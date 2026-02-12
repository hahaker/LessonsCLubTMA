'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { NoAccessScreen } from './NoAccessScreen';

interface AccessContextType {
  user: User | null;
  hasAccess: boolean;
  checkAccess: () => Promise<boolean>;
  login: (user: User) => void;
  logout: () => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within AccessProvider');
  }
  return context;
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAccess = async (): Promise<boolean> => {
    try {
      // Здесь будет проверка подписки/доступа
      // Пока симулируем проверку
      const mockUser = {
        id: '1',
        name: 'Пользователь',
        email: 'user@example.com',
        hasAccess: true, // Измените на false для тестирования экрана "нет доступа"
        subscription: {
          type: 'premium' as const,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
          isActive: true,
        },
      };
      
      setUser(mockUser);
      setHasAccess(mockUser.hasAccess);
      return mockUser.hasAccess;
    } catch (error) {
      console.error('Access check failed:', error);
      setHasAccess(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newUser: User) => {
    setUser(newUser);
    setHasAccess(newUser.hasAccess);
  };

  const logout = () => {
    setUser(null);
    setHasAccess(false);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return <NoAccessScreen />;
  }

  return (
    <AccessContext.Provider value={{ user, hasAccess, checkAccess, login, logout }}>
      {children}
    </AccessContext.Provider>
  );
}