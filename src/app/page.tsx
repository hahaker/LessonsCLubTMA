'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { HomeSection } from '@/types';
import Link from 'next/link';

const homeSections = [
  {
    id: 'lessons' as HomeSection,
    title: 'Уроки',
    description: 'Обучающие материалы и курсы',
    href: '/lessons',
    icon: '📚',
    color: 'bg-blue-500',
  },
  {
    id: 'streams' as HomeSection,
    title: 'Эфиры',
    description: 'Прямые трансляции и записи',
    href: '/streams',
    icon: '📺',
    color: 'bg-red-500',
  },
  {
    id: 'prompts' as HomeSection,
    title: 'Промпты',
    description: 'Готовые шаблоны и примеры',
    href: '/prompts',
    icon: '💡',
    color: 'bg-yellow-500',
  },
  {
    id: 'tools' as HomeSection,
    title: 'Инструменты',
    description: 'Полезные сервисы и утилиты',
    href: '/tools',
    icon: '🔧',
    color: 'bg-green-500',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Здесь будет логика поиска
    console.log('Search query:', query);
  };

  const handleInviteFriend = () => {
    // Здесь будет логика приглашения друзей
    console.log('Invite friend');
    alert('Функция приглашения друзей');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Добро пожаловать!
          </h1>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск уроков и разделов..."
            className="mb-4"
          />
          
          {/* Invite Friend Button */}
          <button
            onClick={handleInviteFriend}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
          >
            🎉 Пригласи друга
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Разделы
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {homeSections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${section.color} text-white text-xl mb-3 group-hover:scale-105 transition-transform duration-200`}>
                  {section.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
