#!/bin/bash

# Скрипт для запуска среды разработки

set -e

echo "🔧 Запуск среды разработки..."

# Проверка наличия Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен! Установите Docker и попробуйте снова."
    exit 1
fi

# Создание .env.local если не существует
if [ ! -f ".env.local" ]; then
    echo "📝 Создание .env.local из .env..."
    cp .env .env.local
    echo "DATABASE_URL=\"postgresql://lessons_user:lessons_password@localhost:5432/lessons_db_dev?schema=public\"" >> .env.local
fi

# Запуск сервисов для разработки (только БД и Redis)
echo "🐘 Запуск PostgreSQL и Redis..."
docker-compose -f docker-compose.dev.yml up -d

# Ожидание готовности базы данных
echo "⏳ Ожидание готовности базы данных..."
until docker-compose -f docker-compose.dev.yml exec -T db-dev pg_isready -U lessons_user -d lessons_db_dev; do
    echo "База данных еще не готова, ждем..."
    sleep 2
done

# Установка зависимостей если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Генерация Prisma Client
echo "🔄 Генерация Prisma Client..."
npx prisma generate

# Применение миграций
echo "🗃️  Применение миграций..."
npx prisma db push

# Заполнение тестовыми данными (опционально)
if [ "$1" = "--seed" ]; then
    echo "🌱 Заполнение базы тестовыми данными..."
    npx prisma db seed || echo "⚠️  Не удалось заполнить данными (возможно, скрипт seed не настроен)"
fi

echo ""
echo "✅ Среда разработки готова!"
echo "🌐 Adminer (управление БД): http://localhost:8080"
echo "   - Сервер: db-dev"
echo "   - Пользователь: lessons_user"
echo "   - Пароль: lessons_password"
echo "   - База: lessons_db_dev"
echo ""
echo "Теперь запустите приложение:"
echo "  npm run dev"
echo ""
echo "Для остановки БД:"
echo "  docker-compose -f docker-compose.dev.yml down"