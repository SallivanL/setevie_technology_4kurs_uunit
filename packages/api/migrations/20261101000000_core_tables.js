exports.up = async (knex) => {
  await knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table.string('name', 120).notNullable();
    table.integer('student_count').notNullable();
    table.decimal('cost', 12, 2).notNullable();
    table.timestamps(true, true);
  });
  await knex.raw('ALTER TABLE tariffs ADD CONSTRAINT tariffs_student_count_positive CHECK (student_count > 0)');
  await knex.raw('ALTER TABLE tariffs ADD CONSTRAINT tariffs_cost_nonnegative CHECK (cost >= 0)');

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 320).notNullable();
    table.string('password_hash', 255).notNullable();
    table.integer('type').notNullable();
    table.integer('tariff_id').nullable().references('id').inTable('tariffs').onDelete('SET NULL');
    table.timestamps(true, true);
  });
  await knex.raw('ALTER TABLE users ADD CONSTRAINT users_type_valid CHECK (type IN (1, 2, 3))');
  await knex.raw('CREATE UNIQUE INDEX users_email_lower_unique ON users (lower(email))');
  await knex.raw('ALTER TABLE users ADD CONSTRAINT users_tariff_only_teacher CHECK (tariff_id IS NULL OR type = 1)');

  await knex.schema.createTable('teacher_students', (table) => {
    table.integer('teacher_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('student_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.primary(['teacher_id', 'student_id']);
    table.index(['student_id']);
  });
  await knex.raw(
    'ALTER TABLE teacher_students ADD CONSTRAINT teacher_students_distinct_users CHECK (teacher_id <> student_id)'
  );

  await knex.schema.createTable('lessons', (table) => {
    table.increments('id').primary();
    table.integer('teacher_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.timestamps(true, true);
    table.index(['teacher_id', 'id']);
  });

  await knex.schema.createTable('lesson_sections', (table) => {
    table.increments('id').primary();
    table.integer('lesson_id').notNullable().references('id').inTable('lessons').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.integer('position').notNullable().defaultTo(0);
    table.unique(['lesson_id', 'position']);
  });

  await knex.schema.createTable('lesson_widgets', (table) => {
    table.increments('id').primary();
    table.integer('section_id').notNullable().references('id').inTable('lesson_sections').onDelete('CASCADE');
    table.string('type', 80).notNullable();
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table.integer('position').notNullable().defaultTo(0);
    table.unique(['section_id', 'position']);
  });

  await knex.schema.createTable('words', (table) => {
    table.increments('id').primary();
    table.integer('teacher_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('student_id').nullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('english', 255).notNullable();
    table.string('russian', 255).notNullable();
    table.timestamps(true, true);
    table.index(['student_id']);
  });
  await knex.raw(`
    CREATE UNIQUE INDEX words_teacher_general_english_unique
    ON words (teacher_id, english)
    WHERE student_id IS NULL
  `);
  await knex.raw(`
    CREATE UNIQUE INDEX words_teacher_student_english_unique
    ON words (teacher_id, student_id, english)
    WHERE student_id IS NOT NULL
  `);

  await knex.schema.createTable('refresh_sessions', (table) => {
    table.uuid('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('token_hash', 64).notNullable().unique();
    table.timestamp('expires_at', { useTz: true }).notNullable();
    table.timestamp('revoked_at', { useTz: true }).nullable();
    table.string('user_agent', 500).nullable();
    table.timestamps(true, true);
    table.index(['user_id', 'revoked_at']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('refresh_sessions');
  await knex.raw('DROP INDEX IF EXISTS words_teacher_student_english_unique');
  await knex.raw('DROP INDEX IF EXISTS words_teacher_general_english_unique');
  await knex.schema.dropTableIfExists('words');
  await knex.schema.dropTableIfExists('lesson_widgets');
  await knex.schema.dropTableIfExists('lesson_sections');
  await knex.schema.dropTableIfExists('lessons');
  await knex.schema.dropTableIfExists('teacher_students');
  await knex.raw('DROP INDEX IF EXISTS users_email_lower_unique');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('tariffs');
};
