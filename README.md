# uunit-setevie-technologii

## План развития бэкенда

1. **Основа (сделана):** Node.js API в `packages/api`, подключение Knex и Objection к PostgreSQL, Docker Compose для базы, health-check-и.
2. **Схема данных:** когда будут определены сущности проекта, добавить Knex-миграции и модели Objection.
3. **Ручки API:** реализовать маршруты и проверки входных данных для нужных сценариев.
4. **Подключение фронтенда:** настроить адрес API для Vite и связать страницы с ручками.

Сейчас прикладных таблиц и бизнес-ручек нет: это чистая основа, которая уже подключается к PostgreSQL.

## Локальный запуск

Нужны Node.js, npm и запущенный Docker Desktop (или Docker Engine с Compose). В Docker работает только PostgreSQL; API и фронтенд запускаются локально.

1. Скопируйте `.env.example` в `.env`. При необходимости измените параметры базы. Значения из примера подходят только для локальной разработки.
2. Запустите PostgreSQL из корня репозитория:

   ```sh
   docker compose up -d
   ```

   Compose запустит только контейнер `postgres` и сохранит данные в volume `postgres_data`.

3. Установите npm-зависимости, если ещё не устанавливали, и запустите API вместе с фронтендом:

   ```sh
   npm install
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

Миграции можно добавлять в `packages/api/migrations`, затем выполнять команду из корня:

```sh
npm run migrate:latest --workspace=packages/api
```

