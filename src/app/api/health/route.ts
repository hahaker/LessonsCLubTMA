import { NextResponse } from 'next/server';

// Health check endpoint для мониторинга и Docker health check
export async function GET() {
  try {
    // Здесь можно добавить проверки:
    // - Подключения к базе данных
    // - Доступности внешних сервисов
    // - Состояния кеша и т.д.
    
    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        server: 'healthy',
        // database: await checkDatabase(),
        // redis: await checkRedis(),
      }
    };

    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 503 }
    );
  }
}

// Функции для проверки компонентов системы
// async function checkDatabase() {
//   try {
//     const { PrismaClient } = await import('@prisma/client');
//     const prisma = new PrismaClient();
//     await prisma.$queryRaw`SELECT 1`;
//     await prisma.$disconnect();
//     return 'healthy';
//   } catch {
//     return 'unhealthy';
//   }
// }

// async function checkRedis() {
//   // Добавьте проверку Redis если используется
//   return 'not_configured';
// }