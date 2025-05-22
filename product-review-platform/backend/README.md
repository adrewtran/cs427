# Product Review Platform - Backend

This is the backend service for the Product Review Platform, featuring AI-powered sentiment analysis for product reviews.

## Features

- Complete product and category management
- Review system with ratings
- **AI-powered sentiment analysis** using Mistral.ai
- Automatic sentiment classification (positive/negative/neutral)
- Sentiment statistics endpoints
- Rule-based fallback when AI is unavailable

## Setup

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root of the backend directory with:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=product_reviews_db

   # Mistral API Configuration
   MISTRAL_API_KEY=your_mistral_api_key

   # Server Configuration
   PORT=3001
   ```

3. **Initialize the database**:
   ```
   npm run initdb
   ```

4. **Build the application**:
   ```
   npm run build
   ```

5. **Start the server**:
   ```
   npm run dev
   ```

## Sentiment Analysis

The platform analyzes the sentiment of product reviews automatically when they are created or updated. This is done using:

1. **Mistral.ai API**: A powerful AI that analyzes text and provides sentiment scores
2. **Rule-based fallback**: A simple algorithm that works even without AI access

Each review receives:
- A sentiment category (`positive`, `negative`, or `neutral`)
- A sentiment score (from -1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive)

### Migrating Existing Reviews

To add sentiment analysis to existing reviews that don't have sentiment data:

```
npm run migrate-sentiment
```

This script will:
- Find all reviews without sentiment data
- Process each review with the sentiment analysis service
- Update the database with sentiment values
- Skip reviews with empty comments

If you're using the Mistral.ai API, it will add a small delay between requests to avoid rate limiting.

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Reviews with Sentiment
- `GET /api/products/:productId/reviews` - Get all reviews for a product
- `POST /api/products/:productId/reviews` - Create a new review (sentiment analyzed automatically)
- `PUT /api/products/:productId/reviews/:id` - Update a review
- `DELETE /api/products/:productId/reviews/:id` - Delete a review
- `GET /api/products/:productId/reviews/sentiment` - Get sentiment statistics for a product

## Testing Sentiment Analysis

You can test the sentiment analysis functionality by running:

```
node --loader ts-node/esm src/utils/testSentiment.ts
```

This will analyze sample reviews and display the results.

## Getting a Mistral API Key

1. Create an account at [mistral.ai](https://mistral.ai/)
2. Navigate to the API section
3. Generate a new API key
4. Add it to your `.env` file

If you don't have a Mistral API key, the system will automatically fall back to the rule-based sentiment analysis. 