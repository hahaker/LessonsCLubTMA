# Деплой мини-приложения для закрытого клуба

## 🚀 Быстрый старт для продакшена

### 1. Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагрузка для применения прав пользователя
sudo reboot
```

### 2. Клонирование и настройка проекта

```bash
# Клонирование репозитория
git clone <your-repository-url>
cd LessonsMiniApp

# Копирование и настройка переменных окружения
cp .env .env.production
nano .env.production  # Настройте продакшен переменные

# Сделать скрипты исполняемыми
chmod +x scripts/*.sh
```

### 3. Настройка переменных окружения

Отредактируйте `.env.production`:

```env
# Продакшен база данных
DATABASE_URL="postgresql://lessons_user:STRONG_PASSWORD@db:5432/lessons_db?schema=public"

# Безопасность
NEXTAUTH_SECRET="your-very-strong-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"

# Telegram интеграция
TELEGRAM_BOT_TOKEN="your-real-bot-token"
TELEGRAM_WEBHOOK_URL="https://yourdomain.com/api/telegram/webhook"

# Email настройки
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Платежи
PAYMENT_PROVIDER_API_KEY="your-real-payment-key"

# Продакшен режим
NODE_ENV="production"
```

### 4. Деплой

```bash
# Первичный деплой
./scripts/deploy.sh

# Деплой с созданием резервной копии
./scripts/deploy.sh --backup
```

### 5. Настройка SSL (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение SSL сертификата
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Автоматическое обновление сертификатов
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🛠 Управление после деплоя

### Мониторинг

```bash
# Просмотр логов
docker-compose logs -f app
docker-compose logs -f db
docker-compose logs -f nginx

# Состояние сервисов
docker-compose ps

# Использование ресурсов
docker stats
```

### Обновления

```bash
# Обновление приложения
git pull origin main
./scripts/deploy.sh --backup

# Только перезапуск без пересборки
docker-compose restart app
```

### Резервные копии

```bash
# Создание резервной копии
./scripts/db-backup.sh

# Восстановление из копии
docker-compose exec -T db psql -U lessons_user -d lessons_db < backups/lessons_db_backup_YYYYMMDD_HHMMSS.sql
```

### Масштабирование

```bash
# Увеличение количества экземпляров приложения
docker-compose up -d --scale app=3
```

## 📊 Мониторинг и алерты

### Health checks

- **Приложение**: `http://your-domain/api/health`
- **База данных**: Встроен в Docker Compose
- **Nginx**: Встроен в конфигурацию

### Логирование

- Логи приложения: `/var/lib/docker/volumes/lessonsminiapp_app_logs/_data`
- Логи Nginx: `/var/lib/docker/volumes/lessonsminiapp_nginx_logs/_data`
- Логи PostgreSQL: В контейнере

## 🔒 Безопасность

### Настройка файрвола

```bash
# UFW настройка
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Регулярные обновления

```bash
# Автоматические обновления безопасности
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

### Мониторинг безопасности

```bash
# Установка fail2ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
```

## 🚨 Troubleshooting

### Проблемы с базой данных

```bash
# Проверка подключения
docker-compose exec db pg_isready -U lessons_user

# Подключение к базе
docker-compose exec db psql -U lessons_user -d lessons_db

# Пересборка базы
docker-compose down
docker volume rm lessonsminiapp_postgres_data
docker-compose up -d
```

### Проблемы с приложением

```bash
# Полная пересборка
docker-compose build --no-cache
docker-compose up -d

# Проверка переменных окружения
docker-compose exec app env | grep -E '(DATABASE|NEXTAUTH)'
```

### Проблемы с Nginx

```bash
# Проверка конфигурации
docker-compose exec nginx nginx -t

# Перезагрузка конфигурации
docker-compose exec nginx nginx -s reload
```

## 📈 Оптимизация производительности

### Database tuning

В `docker-compose.yml` добавьте в `db` сервис:

```yaml
command: [
  "postgres",
  "-c", "shared_buffers=256MB",
  "-c", "effective_cache_size=1GB",
  "-c", "maintenance_work_mem=64MB",
  "-c", "checkpoint_completion_target=0.9",
  "-c", "wal_buffers=16MB",
  "-c", "random_page_cost=1.1"
]
```

### Nginx caching

Добавьте кеширование статики в `nginx/sites-available/lessons.conf`.

---

**Важно**: Замените все placeholder'ы (yourdomain.com, пароли, токены) на реальные значения перед деплоем в продакшен!