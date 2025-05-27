import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create categories table
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable().unique();
    table.text('description');
  });

  // Create products table
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.text('description').notNullable();
    table.integer('categoryId').unsigned().notNullable().references('id').inTable('categories').onDelete('RESTRICT');
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('dateAdded').defaultTo(knex.fn.now());
    table.decimal('averageRating', 2, 1).nullable();
  });

  // Create reviews table
  await knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('productId').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.string('author', 100).notNullable();
    table.integer('rating').notNullable(); // CHECK (rating BETWEEN 1 AND 5) can be handled by validation logic or db specific check constraint
    table.text('comment').notNullable();
    table.enum('sentiment', ['positive', 'negative', 'neutral']).nullable();
    table.decimal('sentiment_score', 4, 3).nullable();
    table.timestamp('date').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop tables in reverse order of creation
  await knex.schema.dropTableIfExists('reviews');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('categories');
}
