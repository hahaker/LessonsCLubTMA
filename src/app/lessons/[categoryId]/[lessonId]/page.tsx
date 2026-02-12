'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

const mockLessons: { [lessonId: string]: Lesson } = {
  '1-1': {
    id: '1-1',
    title: 'Введение в программирование',
    description: 'В этом уроке мы изучим основные понятия программирования, разберем что такое алгоритмы, переменные и функции. Вы узнаете как компьютер исполняет код и какие существуют языки программирования.',
    category: '1',
    duration: 1800,
    isFavorite: false,
    tags: ['основы', 'введение', 'алгоритмы'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    thumbnailUrl: '💡',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
  },
  '1-2': {
    id: '1-2',
    title: 'Переменные и типы данных',
    description: 'Изучаем различные типы данных и переменные. Разберем числа, строки, булевы значения, массивы и объекты. Научимся правильно объявлять и использовать переменные в коде.',
    category: '1',
    duration: 2100,
    isFavorite: true,
    tags: ['переменные', 'типы данных', 'основы'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    thumbnailUrl: '🔢',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  '2-1': {
    id: '2-1',
    title: 'HTML основы',
    description: 'Структура веб-страницы и основные теги HTML. Изучим семантическую разметку, атрибуты тегов и создадим свою первую веб-страницу.',
    category: '2',
    duration: 1500,
    isFavorite: false,
    tags: ['html', 'веб', 'разметка'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    thumbnailUrl: '🏗️',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
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

export default function LessonPage() {
  const params = useParams();
  const categoryId = params?.categoryId as string;
  const lessonId = params?.lessonId as string;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (lessonId && categoryId) {
      const lessonData = mockLessons[lessonId];
      const categoryData = mockCategories[categoryId];
      
      setLesson(lessonData);
      setCategory(categoryData);
    }
  }, [lessonId, categoryId]);

  const toggleFavorite = () => {
    if (lesson) {
      setLesson({ ...lesson, isFavorite: !lesson.isFavorite });
    }
  };

  if (!lesson || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Урок не найден</h1>
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
          <div className="flex items-center mb-2">
            <Link
              href={`/lessons/${categoryId}`}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {category.name}
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {lesson.title}
              </h1>
            </div>
            <button
              onClick={toggleFavorite}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg 
                className={`w-6 h-6 transition-colors ${
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

      {/* Content */}
      <div className="px-4 py-6">
        {/* Video Player */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {lesson.videoUrl ? (
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{lesson.thumbnailUrl}</div>
                    <p className="text-gray-600 mb-4">
                      Видео будет здесь
                    </p>
                    <p className="text-sm text-gray-500">
                      (Замените videoUrl на реальную ссылку)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">{lesson.thumbnailUrl}</div>
                  <p className="text-gray-600">Видео недоступно</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{formatDuration(lesson.duration)}</span>
              <span>•</span>
              <span>{new Date(lesson.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Описание урока
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {lesson.description}
          </p>

          {/* Tags */}
          {lesson.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Теги</h3>
              <div className="flex flex-wrap gap-2">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Предыдущий урок
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              Следующий урок
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}