#!/bin/bash

# Скрипт для создания резервной копии базы данных

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="lessons_db_backup_$TIMESTAMP.sql"

# Создание директории если не существует
mkdir -p $BACKUP_DIR

echo "📦 Создание резервной копии базы данных..."

if docker-compose ps db | grep -q "Up"; then
    # Продакшен база данных
    echo "Создание копии продакшен базы..."
    docker-compose exec -T db pg_dump -U lessons_user -d lessons_db > "$BACKUP_DIR/$BACKUP_FILE"
elif docker-compose -f docker-compose.dev.yml ps db-dev | grep -q "Up"; then
    # База данных для разработки
    echo "Создание копии базы разработки..."
    docker-compose -f docker-compose.dev.yml exec -T db-dev pg_dump -U lessons_user -d lessons_db_dev > "$BACKUP_DIR/dev_$BACKUP_FILE"
else
    echo "❌ База данных не запущена!"
    echo "Запустите базу командой:"
    echo "  docker-compose up -d db    # для продакшena"
    echo "  docker-compose -f docker-compose.dev.yml up -d db-dev   # для разработки"
    exit 1
fi

# Сжатие резервной копии
echo "🗜️  Сжатие резервной копии..."
gzip "$BACKUP_DIR/$BACKUP_FILE" || gzip "$BACKUP_DIR/dev_$BACKUP_FILE" || true

echo "✅ Резервная копия создана:"
ls -la $BACKUP_DIR/*$TIMESTAMP*

# Очистка старых копий (оставляем последние 7)
echo "🧹 Очистка старых резервных копий..."
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete || true

echo "✅ Готово!"