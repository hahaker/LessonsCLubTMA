# Многоэтапная сборка для оптимизации размера образа

# Этап 1: Базовый образ для установки зависимостей
FROM node:20-alpine AS base

# Установка pnpm (более быстрый пакетный менеджер)
RUN npm install -g pnpm

# Этап 2: Установка зависимостей
FROM base AS deps
WORKDIR /app

# Копируем файлы пакетов
COPY package*.json ./
COPY prisma/ ./prisma/

# Устанавливаем зависимости
RUN npm ci

# Генерируем Prisma Client
RUN npx prisma generate

# Этап 3: Сборка приложения
FROM base AS builder
WORKDIR /app

# Копируем установленные зависимости
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Копируем исходный код
COPY . .

# Создаем production build
RUN npm run build

# Этап 4: Production образ
FROM base AS runner
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Создаем директорию для uploads
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

USER nextjs

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные среды
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]