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

3. **Initialize the database (creates the database if it doesn't exist and runs all schema migrations)**:
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

## Database Migrations

This project uses Knex.js to manage database schema changes. Migration files are located in the `db/migrations` directory and seed files for sample/test data are in `db/seeds`.

### Key Commands:

*   **`npm run initdb`**: Ensures the database specified in your `.env` file is created and then runs all pending schema migrations. This is the standard command to get your database schema up to date.
*   **`npm run knex:migrate:make <migration_name>`**: Creates a new migration file. Replace `<migration_name>` with a descriptive name for your migration (e.g., `add_user_email_column`).
    ```bash
    # Example:
    npm run knex:migrate:make add_user_email_column
    ```
*   **`npm run knex:migrate:latest`**: Applies all pending migrations. `initdb` already includes this.
*   **`npm run knex:migrate:rollback`**: Reverts the last batch of applied migrations.
*   **`npm run knex:seed:make <seed_name>`**: Creates a new seed file.
    ```bash
    # Example:
    npm run knex:seed:make sample_users
    ```
*   **`npm run knex:seed:run`**: Runs all seed files to populate the database with sample or initial data. This is useful for development and testing. *Note: The initial sample data for products and categories is now handled by a seed file and can be run with this command.*

When you create a new migration, you will need to edit the generated file in `db/migrations/` to define the schema changes in the `up()` method (to apply the change) and `down()` method (to revert the change).

## Sentiment Analysis

The platform analyzes the sentiment of product reviews automatically when they are created or updated. This is done using:

1. **Mistral.ai API**: A powerful AI that analyzes text and provides sentiment scores
2. **Rule-based fallback**: A simple algorithm that works even without AI access

Each review receives:
- A sentiment category (`positive`, `negative`, or `neutral`)
- A sentiment score (from -1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive)

### Migrating Existing Reviews

For populating sentiment data for existing reviews (a data migration task distinct from schema migrations):
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