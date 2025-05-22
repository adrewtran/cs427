-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS product_reviews_db;
USE product_reviews_db;

-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Create categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- Create products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  categoryId INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  averageRating DECIMAL(2, 1) DEFAULT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Create reviews table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT NOT NULL,
  author VARCHAR(100) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  sentiment ENUM("positive", "negative", "neutral") DEFAULT NULL,
  sentiment_score DECIMAL(4,3) DEFAULT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Furniture', 'Home and office furniture'),
('Appliances', 'Home and kitchen appliances'),
('Fitness', 'Fitness and exercise equipment'),
('Office', 'Office supplies and equipment'),
('Home Decor', 'Decorative items for home'),
('Books', 'Books and publications'),
('Lighting', 'Lighting fixtures and lamps');

-- Insert sample products with category IDs
INSERT INTO products (name, description, categoryId, price) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation.', 1, 129.99),
('Smart Watch', 'Track your fitness and stay connected with this smartwatch.', 1, 199.95),
('Ergonomic Chair', 'Comfortable chair designed for long hours of sitting.', 2, 249.00),
('Coffee Maker', 'Programmable coffee maker with built-in grinder.', 3, 79.99),
('Yoga Mat', 'Non-slip yoga mat for home workouts.', 4, 29.95),
('Laptop Stand', 'Adjustable laptop stand for better posture.', 5, 45.50),
('Bluetooth Speaker', 'Portable speaker with 24-hour battery life.', 1, 89.99),
('Plant Pot Set', 'Set of 3 ceramic plant pots in different sizes.', 6, 34.99),
('Cookbook', 'Collection of easy and healthy recipes.', 7, 24.95),
('Desk Lamp', 'LED desk lamp with adjustable brightness.', 8, 39.99),
('PlayStation 5', 'The console to play the best games.', 1, 499.99),
('Nintendo DS 2', 'The console to play the games.', 1, 199.99);

-- Insert sample reviews
INSERT INTO reviews (productId, author, rating, comment, sentiment, sentiment_score) VALUES
(1, 'John Smith', 5, 'These headphones have incredible sound quality and the noise cancellation is amazing!', 'positive', 0.95),
(1, 'Sarah Johnson', 4, 'Good headphones overall, but battery life could be better.', 'neutral', 0.0),
(2, 'Mike Brown', 5, 'This watch has everything I need and more. The fitness tracking is spot on.', 'positive', 0.98),
(2, 'Emily Davis', 3, 'Nice design but the app is a bit buggy.', 'neutral', 0.0),
(3, 'Alex Wilson', 5, 'Best chair I have owned. My back pain is gone!', 'positive', 0.99),
(4, 'Lisa Garcia', 4, 'Makes great coffee and looks good on the counter.', 'neutral', 0.0),
(5, 'Daniel Lee', 5, 'Perfect thickness and grip. Great for yoga practice.', 'positive', 0.97),
(6, 'Rachel Kim', 4, 'Good quality stand, very sturdy.', 'neutral', 0.0),
(7, 'Chris Taylor', 5, 'Amazing sound quality for such a small speaker.', 'positive', 0.96),
(8, 'Jessica Martinez', 4, 'Beautiful pots, perfect for my indoor plants.', 'neutral', 0.0),
(9, 'Ryan Nelson', 3, 'Some good recipes but nothing extraordinary.', 'neutral', 0.0),
(10, 'Michelle Thompson', 5, 'Love the different light settings, perfect for late night work.', 'positive', 0.94),
(11, 'An Tran', 5, 'It is good console for playing games.', 'positive', 0.93),
(12, 'An Tran 2', 5, 'It is good console for playing games.', 'positive', 0.92);

-- Update product ratings based on reviews
UPDATE products p
SET averageRating = (
  SELECT AVG(rating)
  FROM reviews r
  WHERE r.productId = p.id
)
WHERE id IN (SELECT DISTINCT productId FROM reviews); 