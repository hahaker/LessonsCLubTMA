'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';

interface Referral {
  id: string;
  name: string;
  email?: string;
  joinDate: Date;
  isActive: boolean;
  earnedAmount: number;
}

const mockReferrals: Referral[] = [
  {
    id: '1',
    name: 'Анна',
    email: 'anna@example.com',
    joinDate: new Date('2024-01-10'),
    isActive: true,
    earnedAmount: 500,
  },
  {
    id: '2',
    name: 'Михаил',
    email: 'mikhail@example.com',
    joinDate: new Date('2024-01-15'),
    isActive: true,
    earnedAmount: 300,
  },
  {
    id: '3',
    name: 'Елена',
    joinDate: new Date('2024-01-20'),
    isActive: false,
    earnedAmount: 0,
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU');
}

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteLink] = useState('https://t.me/yourbot?start=ref123456');
  const [referrals] = useState<Referral[]>(mockReferrals);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search referrals:', query);
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert('Ссылка скопирована!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareInviteLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Присоединяйся к закрытому клубу!',
        text: 'Получи доступ к эксклюзивным урокам и материалам',
        url: inviteLink,
      });
    } else {
      copyInviteLink();
    }
  };

  const filteredReferrals = searchQuery
    ? referrals.filter((referral) =>
        referral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : referrals;

  const totalEarnings = referrals.reduce((sum, ref) => sum + ref.earnedAmount, 0);
  const activeReferrals = referrals.filter(ref => ref.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Реферальная программа
          </h1>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Поиск рефералов..."
          />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {referrals.length}
            </div>
            <div className="text-xs text-gray-600">
              Всего рефералов
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {activeReferrals}
            </div>
            <div className="text-xs text-gray-600">
              Активных
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {totalEarnings}₽
            </div>
            <div className="text-xs text-gray-600">
              Заработано
            </div>
          </div>
        </div>

        {/* Invite Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Пригласить друзей
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Поделитесь ссылкой с друзьями и получайте бонусы за каждого нового участника клуба
          </p>
          
          <div className="flex space-x-3">
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Ваша реферальная ссылка:</div>
              <div className="text-sm text-gray-900 truncate">{inviteLink}</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyInviteLink}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Копировать"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={shareInviteLink}
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                title="Поделиться"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              Ваши рефералы ({filteredReferrals.length})
            </h3>
          </div>
          
          {filteredReferrals.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredReferrals.map((referral) => (
                <div key={referral.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {referral.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {referral.name}
                        </div>
                        {referral.email && (
                          <div className="text-sm text-gray-500">
                            {referral.email}
                          </div>
                        )}
                        <div className="text-xs text-gray-400">
                          Присоединился {formatDate(referral.joinDate)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        referral.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {referral.isActive ? 'Активен' : 'Неактивен'}
                      </div>
                      {referral.earnedAmount > 0 && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          +{referral.earnedAmount}₽
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'Не найдено' : 'Пока нет рефералов'}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Попробуйте изменить поисковый запрос' 
                  : 'Пригласите друзей и получайте бонусы!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}