'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';

interface Message {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  isOnline: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'Админ',
    message: 'Добро пожаловать в чат закрытого клуба! Здесь можно обсуждать уроки и задавать вопросы.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    isOnline: true,
  },
  {
    id: '2',
    author: 'Мария',
    message: 'Подскажите, где можно найти дополнительные материалы по веб-разработке?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isOnline: true,
  },
  {
    id: '3',
    author: 'Алексей',
    message: 'Отличные уроки! Особенно понравилось объяснение основ программирования.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isOnline: false,
  },
  {
    id: '4',
    author: 'Екатерина',
    message: 'Есть ли планы добавить уроки по мобильной разработке?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isOnline: true,
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 1) return 'только что';
  if (minutes < 60) return `${minutes} мин назад`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ч назад`;
  
  const days = Math.floor(hours / 24);
  return `${days} д назад`;
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<Message[]>(mockMessages);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Здесь будет поиск по сообщениям
    console.log('Search messages:', query);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Здесь будет отправка сообщения
    console.log('Send message:', newMessage);
    alert('Функция отправки сообщений будет реализована позже');
    setNewMessage('');
  };

  const filteredMessages = searchQuery
    ? messages.filter(
        (msg) =>
          msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Чат клуба
          </h1>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск сообщений..."
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-2">
                    {message.author}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    message.isOnline ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {message.message}
            </p>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Сообщения не найдены' : 'Пока нет сообщений'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Попробуйте изменить поисковый запрос' 
                : 'Станьте первым, кто напишет сообщение!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Написать сообщение..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}