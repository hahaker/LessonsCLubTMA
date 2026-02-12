'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { Category } from '@/types';

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Основы программирования',
    description: 'Изучите основы разработки с нуля',
    lessonsCount: 12,
    coverImage: '💻',
  },
  {
    id: '2',
    name: 'Web разработка',
    description: 'HTML, CSS, JavaScript и современные фреймворки',
    lessonsCount: 18,
    coverImage: '🌐',
  },
  {
    id: '3',
    name: 'Мобильная разработка',
    description: 'Создание приложений для iOS и Android',
    lessonsCount: 15,
    coverImage: '📱',
  },
  {
    id: '4',
    name: 'Дизайн UI/UX',
    description: 'Принципы дизайна и пользовательского опыта',
    lessonsCount: 20,
    coverImage: '🎨',
  },
  {
    id: '5',
    name: 'Базы данных',
    description: 'SQL, NoSQL и работа с данными',
    lessonsCount: 10,
    coverImage: '🗄️',
  },
  {
    id: '6',
    name: 'DevOps и облака',
    description: 'Развертывание и управление инфраструктурой',
    lessonsCount: 14,
    coverImage: '☁️',
  },
];

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(mockCategories);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCategories(mockCategories);
      return;
    }

    const filtered = mockCategories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase()) ||
      category.description?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center mb-4">
            <Link
              href="/"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              Уроки
            </h1>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск категорий уроков..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Найдено категорий: {filteredCategories.length}
            </p>
          </div>
        )}

        <div className="grid gap-4">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/lessons/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <div className="flex items-center">
                  <div className="text-3xl mr-4 group-hover:scale-105 transition-transform duration-200">
                    {category.coverImage}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 font-medium">
                        {category.lessonsCount} уроков
                      </span>
                      <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </div>
    </div>
  );
}