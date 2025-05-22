# Product Review Platform

A full-stack web application that allows users to browse products, post reviews, rate products, and analyze review sentiment using AI.

## 🌟 Features

- **Product Management**: Browse, search, and filter products by category
- **Review System**: Add, edit, and delete reviews with ratings
- **AI-Powered Sentiment Analysis**: Automatically analyze review sentiment using Mistral.ai
- **Sentiment Statistics**: View sentiment breakdowns for product reviews
- **Responsive Design**: Works on mobile, tablet, and desktop

## 📋 Prerequisites

- **Node.js**: Version 14 or higher
- **MySQL**: Database (can be installed locally or used via Docker)
- **NPM**: For package management (included with Node.js)

## 🛢️ Database Setup (Important)

The application requires a MySQL database to store product and review data. **This is a critical step** - the application will not function without a properly configured database.

### Option 1: Using Docker (Recommended)

If you have Docker installed, you can easily set up MySQL without installing it locally:

```bash
# From the root directory
docker-compose up -d
```

This will start a MySQL container with all the necessary configurations. The database will be accessible on port 3306 with the following default credentials:
- Username: root
- Password: rootpassword
- Database: product_reviews_db

### Option 2: Using Local MySQL Installation

If you prefer to use an existing MySQL installation:

1. Make sure your MySQL server is running
2. Create a database named `product_reviews_db` (or customize the name in your `.env` file)
3. Make note of your MySQL credentials as you'll need them for the `.env` file

Be sure to update the database configuration in the backend `.env` file to match your local MySQL setup.

## 🚀 Quick Start

### Step 1: Get the Code

Download or extract the project files to your local machine.

### Step 2: Run the Setup Script (Recommended)

From the root directory of the project, run:
```bash
npm run setup
```

This will automatically install all dependencies, create the necessary configuration files, and build the application. After that please follow the instructions on the screen to finish the configuration.

### Step 3: Manual Setup (Alternative)

If you prefer to set things up manually, follow these steps:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=product_reviews_db

   # Mistral API Configuration (Optional)
   MISTRAL_API_KEY=your_mistral_api_key

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```
   > ⚠️ **Important**: Make sure your database credentials match your actual MySQL setup (local or Docker)

4. Build the backend:
   ```bash
   npm run build
   ```

5. Initialize the database:
   ```bash
   npm run initdb
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will be running at http://localhost:5000

7. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

8. Install dependencies:
   ```bash
   npm install
   ```

9. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## 📱 Using the Application

1. Open your browser and go to http://localhost:5173
2. Browse products by category using the navigation menu
3. Click on products to view details and reviews
4. Add your own reviews with ratings
5. See sentiment analysis for each review (positive, negative, or neutral)

## 📚 API Documentation

Once the backend is running, you can access the Swagger API documentation at:
```
http://localhost:5000/api-docs
```

This provides a complete overview of all available API endpoints.

## 🧠 Sentiment Analysis

The platform uses Mistral.ai to analyze review sentiment. Each review receives:

- A sentiment category (positive, negative, or neutral)
- A sentiment score (-1 to 1, where -1 is very negative and 1 is very positive)

If you don't have a Mistral API key, the system will use a built-in rule-based analyzer instead.

## 🔧 Advanced Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | (none) |
| DB_NAME | Database name | product_reviews_db |
| PORT | Backend server port | 5000 |
| MISTRAL_API_KEY | API key for Mistral.ai | (optional) |

### Cleaning Code Comments

For production or deployment, you can remove unnecessary comments from the codebase while preserving important ones:

```bash
npm run clean-comments
```

This script will:
- Remove regular comments from all JavaScript and TypeScript files
- Preserve comments marked as IMPORTANT, TODO, NOTE, or WARNING
- Keep JSDoc comments for public APIs and exports
- Show a summary of changes made

### Project Structure

```
product-review-platform/
├── backend/                # Server code
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # API services
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   └── types/          # TypeScript interfaces
```

## ❓ Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if MySQL is running
   - Verify your database credentials in the `.env` file
   - Make sure the database exists

2. **Missing Modules Error**
   - Run `npm install` in both frontend and backend directories

3. **Port Already in Use**
   - Change the PORT in the backend `.env` file
   - Update the API URL in the frontend if needed

## 📄 License

This project is licensed under the MIT License. 