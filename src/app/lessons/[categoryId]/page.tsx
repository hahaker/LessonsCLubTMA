'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SearchBar } from '@/components/SearchBar';
import { Lesson, Category } from '@/types';

const mockCategories: { [id: string]: Category } = {
  '1': {
    id: '1',
    name: 'Основы программирования',
    description: 'Изучите основы разработки с нуля',
    lessonsCount: 12,
    coverImage: '💻',
  },
  '2': {
    id: '2',
    name: 'Web разработка',
    description: 'HTML, CSS, JavaScript и современные фреймворки',
    lessonsCount: 18,
    coverImage: '🌐',
  },
};

const mockLessons: { [categoryId: string]: Lesson[] } = {
  '1': [
    {
      id: '1-1',
      title: 'Введение в программирование',
      description: 'Основные понятия и принципы программирования',
      category: '1',
      duration: 1800, // 30 минут
      isFavorite: false,
      tags: ['основы', 'введение'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      thumbnailUrl: '💡',
    },
    {
      id: '1-2',
      title: 'Переменные и типы данных',
      description: 'Изучаем различные типы данных и переменные',
      category: '1',
      duration: 2100, // 35 минут
      isFavorite: true,
      tags: ['переменные', 'типы данных'],
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      thumbnailUrl: '🔢',
    },
    {
      id: '1-3',
      title: 'Условные конструкции',
      description: 'If-else, switch и другие условные операторы',
      category: '1',
      duration: 2400, // 40 минут
      isFavorite: false,
      tags: ['условия', 'логика'],
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
      thumbnailUrl: '🔀',
    },
  ],
  '2': [
    {
      id: '2-1',
      title: 'HTML основы',
      description: 'Структура веб-страницы и основные теги',
      category: '2',
      duration: 1500, // 25 минут
      isFavorite: false,
      tags: ['html', 'веб'],
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04'),
      thumbnailUrl: '🏗️',
    },
    {
      id: '2-2',
      title: 'CSS стилизация',
      description: 'Как сделать страницу красивой с помощью CSS',
      category: '2',
      duration: 2700, // 45 минут
      isFavorite: true,
      tags: ['css', 'стили'],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      thumbnailUrl: '🎨',
    },
  ],
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}ч ${remainingMinutes}м`;
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.categoryId as string;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categoryId) {
      const categoryData = mockCategories[categoryId];
      const lessonsData = mockLessons[categoryId] || [];
      
      setCategory(categoryData);
      setLessons(lessonsData);
      setFilteredLessons(lessonsData);
    }
  }, [categoryId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredLessons(lessons);
      return;
    }

    const filtered = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.description.toLowerCase().includes(query.toLowerCase()) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredLessons(filtered);
  };

  const toggleFavorite = (lessonId: string) => {
    const updatedLessons = lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, isFavorite: !lesson.isFavorite } : lesson
    );
    const updatedFiltered = filteredLessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, isFavorite: !lesson.isFavorite } : lesson
    );
    
    setLessons(updatedLessons);
    setFilteredLessons(updatedFiltered);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Категория не найдена</h1>
          <Link href="/lessons" className="text-blue-600 hover:text-blue-700">
            Вернуться к урокам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center mb-4">
            <Link
              href="/lessons"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {category.name}
              </h1>
              <p className="text-sm text-gray-600">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск уроков..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Найдено уроков: {filteredLessons.length}
            </p>
          </div>
        )}

        <div className="grid gap-4">
          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${categoryId}/${lesson.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                    {lesson.thumbnailUrl}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>{formatDuration(lesson.duration)}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              {lesson.tags.slice(0, 2).map((tag) => (
                                <span 
                                  key={tag}
                                  className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(lesson.id);
                        }}
                        className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                      >
                        <svg 
                          className={`w-5 h-5 transition-colors ${
                            lesson.isFavorite 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                          fill={lesson.isFavorite ? 'currentColor' : 'none'}
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredLessons.length === 0 && (
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