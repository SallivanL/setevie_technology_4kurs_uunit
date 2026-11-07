# API

Express API backed by PostgreSQL, Knex migrations, and Objection models.

## Configuration

Create a root `.env` file (or set these variables in the environment):

```dotenv
DATABASE_URL=postgres://uunit:uunit_local_password@127.0.0.1:5432/uunit
PORT=3000
CORS_ORIGIN=http://localhost:5173
JWT_ACCESS_SECRET=replace-with-a-long-random-secret
JWT_REFRESH_SECRET=replace-with-another-long-random-secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d
REFRESH_COOKIE_NAME=refresh_token
REFRESH_COOKIE_SAME_SITE=lax
```

In production, both JWT secrets are required. If the frontend and API are hosted on different sites, configure `REFRESH_COOKIE_SAME_SITE=none` and serve the API over HTTPS. CORS must list the exact frontend origin because refresh cookies use credentials.

## Database and first admin

From the repository root:

```sh
cd packages/api/migrations
knex migrate:make add_feature_name
knex migrate:list
knex migrate:latest
```

`knexfile.js` points Knex at `migrations/`. Run the CLI from `packages/api` or `packages/api/migrations`; Knex finds the config by walking up from the current directory. `migrate:make` creates the timestamped file in that folder, and `migrate:latest` applies all pending files. The initial schema is already defined in `migrations/20261101000000_core_tables.js`; do not create another migration that recreates those tables. Write future schema changes in each new file's `exports.up` and `exports.down` functions.

Rollback the latest applied migration with `knex migrate:rollback`. Create the initial admin with:

```sh
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='use-a-long-password' npm run create-admin
```

Create a teacher from the repository root. `TEACHER_TARIFF_ID` is optional:

```sh
TEACHER_EMAIL=teacher@example.com TEACHER_PASSWORD='use-a-long-password' npm run create-teacher
```

Create a student; optionally set `TEACHER_ID` to assign the student to an existing teacher:

```sh
STUDENT_EMAIL=student@example.com STUDENT_PASSWORD='use-a-long-password' TEACHER_ID=1 npm run create-student
```

Create tariff records through the admin API after signing in. The migration does not invent tariff names, student limits, or prices.

## Routes

- `POST /auth/login` accepts `{ "email_address": "...", "password": "..." }`, sets an httpOnly refresh cookie, and returns `{ "user": ..., "access_token": "..." }`.
- `POST /auth/refresh` rotates the refresh session and returns `{ "data": { "access_token": "..." } }` for the existing frontend client.
- `POST /auth/logout`, `GET /auth/me`
- `GET /lessons`, `GET /lessons/:id`, `POST /lessons`, `PUT /lessons/:id`, `DELETE /lessons/:id`
- `GET /words`, `GET /words/teachers`, `GET /words/students`, `POST /words`, `PUT /words/:id`, `DELETE /words/:id`
- `GET /tariffs`; admin-only `POST /tariffs`, `PUT /tariffs/:id`, `DELETE /tariffs/:id`
- Admin-only `GET /users` and `POST /users`; teachers/admins can assign students with `POST /users/:teacherId/students/:studentId` and remove the assignment with `DELETE` on the same path.

User `type` values are `1` teacher, `2` student, and `3` admin. Teachers see their own lessons and words; students see data belonging to teachers assigned through `teacher_students`; admins can manage all records.

Each word has a required `teacher_id` and an optional `student_id`. A `NULL` student means the word is common to the teacher; a set `student_id` makes it specific to one of that teacher's assigned students. Students see their teachers' common words and their own student-specific words. Teachers can create common words or assign a word to a student. `GET /words/teachers` and `GET /words/students` return valid associations for the current user, and the frontend prompts for a teacher when more than one is assigned. Both word ownership fields are part of the initial `core_tables` migration.
