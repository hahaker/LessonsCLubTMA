'use client';

import React from 'react';
import { useAccess } from '@/components/AccessProvider';

export default function ProfilePage() {
  const { user, logout } = useAccess();

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      logout();
    }
  };

  const menuItems = [
    {
      id: 'subscription',
      title: 'Моя подписка',
      description: 'Управление подпиской и платежами',
      icon: '💎',
      action: () => alert('Управление подпиской будет доступно позже'),
    },
    {
      id: 'progress',
      title: 'Мой прогресс',
      description: 'Статистика обучения и достижения',
      icon: '📈',
      action: () => alert('Статистика прогресса будет доступна позже'),
    },
    {
      id: 'downloads',
      title: 'Загрузки',
      description: 'Скачанные материалы и уроки',
      icon: '📥',
      action: () => alert('Загрузки будут доступны позже'),
    },
    {
      id: 'notifications',
      title: 'Уведомления',
      description: 'Настройка уведомлений о новых уроках',
      icon: '🔔',
      action: () => alert('Настройки уведомлений будут доступны позже'),
    },
    {
      id: 'support',
      title: 'Поддержка',
      description: 'Связаться с службой поддержки',
      icon: '🆘',
      action: () => alert('Обратиться в поддержку можно через чат'),
    },
    {
      id: 'about',
      title: 'О приложении',
      description: 'Версия и информация о приложении',
      icon: 'ℹ️',
      action: () => alert('Версия 1.0.0 - Мини-приложение для закрытого клуба'),
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Не удалось загрузить профиль</h1>
          <p className="text-gray-600">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-blue-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="text-gray-600">
                {user.email}
              </p>
              {user.subscription && (
                <div className="flex items-center mt-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.subscription.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.subscription.type === 'premium' ? '👑 Премиум' : '⭐ Базовая'}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    до {user.subscription.expiresAt.toLocaleDateString('ru-RU')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center">
                <div className="text-2xl mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Выйти из аккаунта
          </button>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Мини-приложение для закрытого клуба
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Версия 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}