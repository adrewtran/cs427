import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries in reverse order of creation due to foreign keys
  await knex('reviews').del();
  await knex('products').del();
  await knex('categories').del();

  // Inserts seed entries for categories
  await knex('categories').insert([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets' },
    { id: 2, name: 'Furniture', description: 'Home and office furniture' },
    { id: 3, name: 'Appliances', description: 'Home and kitchen appliances' },
    { id: 4, name: 'Fitness', description: 'Fitness and exercise equipment' },
    { id: 5, name: 'Office', description: 'Office supplies and equipment' },
    { id: 6, name: 'Home Decor', description: 'Decorative items for home' },
    { id: 7, name: 'Books', description: 'Books and publications' },
    { id: 8, name: 'Lighting', description: 'Lighting fixtures and lamps' },
  ]);

  // Inserts seed entries for products
  await knex('products').insert([
    { id: 1, name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation.', categoryId: 1, price: 129.99 },
    { id: 2, name: 'Smart Watch', description: 'Track your fitness and stay connected with this smartwatch.', categoryId: 1, price: 199.95 },
    { id: 3, name: 'Ergonomic Chair', description: 'Comfortable chair designed for long hours of sitting.', categoryId: 2, price: 249.00 },
    { id: 4, name: 'Coffee Maker', description: 'Programmable coffee maker with built-in grinder.', categoryId: 3, price: 79.99 },
    { id: 5, name: 'Yoga Mat', description: 'Non-slip yoga mat for home workouts.', categoryId: 4, price: 29.95 },
    { id: 6, name: 'Laptop Stand', description: 'Adjustable laptop stand for better posture.', categoryId: 5, price: 45.50 },
    { id: 7, name: 'Bluetooth Speaker', description: 'Portable speaker with 24-hour battery life.', categoryId: 1, price: 89.99 },
    { id: 8, name: 'Plant Pot Set', description: 'Set of 3 ceramic plant pots in different sizes.', categoryId: 6, price: 34.99 },
    { id: 9, name: 'Cookbook', description: 'Collection of easy and healthy recipes.', categoryId: 7, price: 24.95 },
    { id: 10, name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness.', categoryId: 8, price: 39.99 },
    { id: 11, name: 'PlayStation 5', description: 'The console to play the best games.', categoryId: 1, price: 499.99 },
    { id: 12, name: 'Nintendo DS 2', description: 'The console to play the games.', categoryId: 1, price: 199.99 },
  ]);

  // Inserts seed entries for reviews
  await knex('reviews').insert([
    { productId: 1, author: 'John Smith', rating: 5, comment: 'These headphones have incredible sound quality and the noise cancellation is amazing!', sentiment: 'positive', sentiment_score: 0.95 },
    { productId: 1, author: 'Sarah Johnson', rating: 4, comment: 'Good headphones overall, but battery life could be better.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 2, author: 'Mike Brown', rating: 5, comment: 'This watch has everything I need and more. The fitness tracking is spot on.', sentiment: 'positive', sentiment_score: 0.98 },
    { productId: 2, author: 'Emily Davis', rating: 3, comment: 'Nice design but the app is a bit buggy.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 3, author: 'Alex Wilson', rating: 5, comment: 'Best chair I have owned. My back pain is gone!', sentiment: 'positive', sentiment_score: 0.99 },
    { productId: 4, author: 'Lisa Garcia', rating: 4, comment: 'Makes great coffee and looks good on the counter.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 5, author: 'Daniel Lee', rating: 5, comment: 'Perfect thickness and grip. Great for yoga practice.', sentiment: 'positive', sentiment_score: 0.97 },
    { productId: 6, author: 'Rachel Kim', rating: 4, comment: 'Good quality stand, very sturdy.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 7, author: 'Chris Taylor', rating: 5, comment: 'Amazing sound quality for such a small speaker.', sentiment: 'positive', sentiment_score: 0.96 },
    { productId: 8, author: 'Jessica Martinez', rating: 4, comment: 'Beautiful pots, perfect for my indoor plants.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 9, author: 'Ryan Nelson', rating: 3, comment: 'Some good recipes but nothing extraordinary.', sentiment: 'neutral', sentiment_score: 0.0 },
    { productId: 10, author: 'Michelle Thompson', rating: 5, comment: 'Love the different light settings, perfect for late night work.', sentiment: 'positive', sentiment_score: 0.94 },
    { productId: 11, author: 'An Tran', rating: 5, comment: 'It is good console for playing games.', sentiment: 'positive', sentiment_score: 0.93 },
    { productId: 12, author: 'An Tran 2', rating: 5, comment: 'It is good console for playing games.', sentiment: 'positive', sentiment_score: 0.92 },
  ]);

  // Update product ratings based on reviews
  await knex.raw(`
    UPDATE products p
    SET averageRating = (
      SELECT AVG(rating)
      FROM reviews r
      WHERE r.productId = p.id
    )
    WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.productId = p.id);
  `);
}
