'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search prompts:', query);
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
              Промпты
            </h1>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск промптов..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-6">💡</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Раздел в разработке
          </h2>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Здесь будут готовые шаблоны и примеры для работы с AI и другими инструментами
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}