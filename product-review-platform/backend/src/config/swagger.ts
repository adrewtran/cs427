import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Review Platform API',
      version: '1.0.0',
      description: 'API for managing products and reviews',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Categories',
        description: 'Category management endpoints'  
      },
      {
        name: 'Reviews',
        description: 'Product review management endpoints'
      }
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Category ID'
            },
            name: {
              type: 'string',
              description: 'Category name'
            },
            description: {
              type: 'string',
              description: 'Category description'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Product ID'
            },
            name: {
              type: 'string',
              description: 'Product name'
            },
            description: {
              type: 'string',
              description: 'Product description'
            },
            categoryId: {
              type: 'integer',
              description: 'Category ID'
            },
            category: {
              $ref: '#/components/schemas/Category'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Product price'
            },
            dateAdded: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the product was added'
            },
            averageRating: {
              type: 'number',
              format: 'float',
              description: 'Average product rating'
            }
          }
        },
        Review: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Review ID'
            },
            productId: {
              type: 'integer',
              description: 'Product ID'
            },
            author: {
              type: 'string',
              description: 'Review author'
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description: 'Review rating (1-5)'
            },
            comment: {
              type: 'string',
              description: 'Review comment'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the review was added'
            },
            sentiment: {
              type: 'string',
              enum: ['positive', 'negative', 'neutral'],
              description: 'Review sentiment analysis result'
            },
            sentimentScore: {
              type: 'number',
              format: 'float',
              description: 'Sentiment score from -1 (negative) to 1 (positive)'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'), 
    path.join(__dirname, '../routes/*.js'), 
  ],
};

export const specs = swaggerJsdoc(options); 