'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { Lesson } from '@/types';

const mockFavoriteLessons: Lesson[] = [
  {
    id: '1-2',
    title: 'Переменные и типы данных',
    description: 'Изучаем различные типы данных и переменные',
    category: '1',
    duration: 2100,
    isFavorite: true,
    tags: ['переменные', 'типы данных'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    thumbnailUrl: '🔢',
  },
  {
    id: '2-2',
    title: 'CSS стилизация',
    description: 'Как сделать страницу красивой с помощью CSS',
    category: '2',
    duration: 2700,
    isFavorite: true,
    tags: ['css', 'стили'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    thumbnailUrl: '🎨',
  },
];

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}ч ${remainingMinutes}м`;
}

function getCategoryName(categoryId: string): string {
  const categories: { [id: string]: string } = {
    '1': 'Основы программирования',
    '2': 'Web разработка',
  };
  return categories[categoryId] || 'Неизвестная категория';
}

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Lesson[]>(mockFavoriteLessons);
  const [filteredFavorites, setFilteredFavorites] = useState<Lesson[]>(mockFavoriteLessons);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredFavorites(favorites);
      return;
    }

    const filtered = favorites.filter((lesson) =>
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.description.toLowerCase().includes(query.toLowerCase()) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredFavorites(filtered);
  };

  const toggleFavorite = (lessonId: string) => {
    const updatedFavorites = favorites.filter(lesson => lesson.id !== lessonId);
    const updatedFiltered = filteredFavorites.filter(lesson => lesson.id !== lessonId);
    
    setFavorites(updatedFavorites);
    setFilteredFavorites(updatedFiltered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              Избранное
            </h1>
            <div className="text-sm text-gray-500">
              {favorites.length} {favorites.length === 1 ? 'урок' : 'уроков'}
            </div>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск в избранном..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Найдено: {filteredFavorites.length} из {favorites.length}
            </p>
          </div>
        )}

        {filteredFavorites.length > 0 ? (
          <div className="grid gap-4">
            {filteredFavorites.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4 flex-shrink-0">
                    {lesson.thumbnailUrl}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-blue-600 font-medium mb-1">
                          {getCategoryName(lesson.category)}
                        </div>
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
                          <div className="flex items-center space-x-2 ml-4">
                            <Link
                              href={`/lessons/${lesson.category}/${lesson.id}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Открыть
                            </Link>
                            <button
                              onClick={() => toggleFavorite(lesson.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="Удалить из избранного"
                            >
                              <svg 
                                className="w-5 h-5 text-red-500 fill-current"
                                fill="currentColor"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-6">💔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Ничего не найдено' : 'Нет избранных уроков'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Попробуйте изменить поисковый запрос' 
                : 'Добавьте уроки в избранное, чтобы быстро находить их здесь'
              }
            </p>
            {!searchQuery && (
              <Link
                href="/lessons"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Перейти к урокам
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}