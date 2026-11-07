# uunit-setevie-technologii

## API

Бэкенд находится в `packages/api`: Express, PostgreSQL через Knex, модели и связи через Objection. В API реализованы пользователи с ролями учитель/ученик/админ (`type` 1/2/3), тарифы, назначения учеников учителям, уроки с секциями и виджетами, словарь, а также access/refresh авторизация.

Маршруты и конфигурация описаны в [packages/api/README.md](packages/api/README.md). Фронтенд использует API для входа, чтения уроков и чтения/изменения словаря.

## Локальный запуск

Нужны Node.js, npm и запущенный Docker Desktop (или Docker Engine с Compose). В Docker работает только PostgreSQL; API и фронтенд запускаются локально.

1. Скопируйте `.env.example` в `.env`. При необходимости измените параметры базы и задайте случайные JWT secrets. Значения из примера подходят только для локальной разработки.
2. Запустите PostgreSQL из корня репозитория:

   ```sh
   docker compose up -d
   ```

   Compose запустит только контейнер `postgres` и сохранит данные в volume `postgres_data`.

3. Установите npm-зависимости, если ещё не устанавливали, примените миграции и создайте первого администратора:

   ```sh
   npm install
   cd packages/api
   knex migrate:latest
   cd ../..
   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='use-a-long-password' npm run create-admin
   ```

4. Запустите API вместе с фронтендом:

   ```sh
   npm run start
   ```

   Скрипт `start` запускает API и фронтенд одновременно. По отдельности их можно запустить командами `npm run start:api` и `npm run start:front`.

API доступен на `http://localhost:3000`, фронтенд — на `http://localhost:5173`. Проверить API вместе с подключением к базе можно так:

   ```sh
   curl http://localhost:3000/health/ready
   ```

   Ожидаемый ответ: `{"status":"ok","database":"connected"}`. Адрес проверки процесса без обращения к базе: `http://localhost:3000/health/live`.

Остановить PostgreSQL, сохранив данные:

```sh
docker compose down
```

Снова запустить PostgreSQL:

```sh
docker compose up -d
```

Удалить контейнер и все данные базы:

```sh
docker compose down -v
```

Данные хранятся в Docker volume `postgres_data`, поэтому обычная остановка их не удаляет.

## Компоненты и база данных

- `postgres` — PostgreSQL 17.
- API при старте проверяет соединение с базой. `/health/ready` также проверяет PostgreSQL.
- Порт PostgreSQL задаётся через `DB_PORT` (по умолчанию `5432`); порт API задаётся через `PORT` (по умолчанию `3000`).

Миграции находятся в `packages/api/migrations`. Перейдите в папку миграций или `packages/api` и используйте Knex CLI:

```sh
cd packages/api/migrations
knex migrate:make add_feature_name
knex migrate:list
knex migrate:latest
knex migrate:rollback
```

