import React from 'react';

export function NoAccessScreen() {
  const handleSubscribe = () => {
    // Здесь будет редирект на страницу оформления подписки
    // Например, через Telegram WebApp или внешнюю ссылку
    console.log('Redirect to subscription page');
    alert('Переход к оформлению подписки');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {/* Иконка замка */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Нет доступа
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Для доступа к контенту закрытого клуба необходимо оформить подписку. 
          Получите доступ ко всем урокам, эфирам и эксклюзивным материалам.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleSubscribe}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Оформить подписку
          </button>
          
          <p className="text-sm text-gray-500">
            Есть вопросы? Обратитесь в поддержку клуба
          </p>
        </div>
      </div>
    </div>
  );
}