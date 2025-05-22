import express from 'express';
import { body } from 'express-validator';
import { 
  getReviews, 
  createReview, 
  updateReview, 
  deleteReview,
  getSentimentStats
} from '../controllers/reviewController.js';
import { validate } from '../middlewares/validation.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: A list of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid product ID
 */
router.get('/', getReviews);

/**
 * @swagger
 * /api/products/{productId}/reviews/sentiment:
 *   get:
 *     summary: Get sentiment statistics for a product's reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Sentiment statistics for the product's reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     positive:
 *                       type: integer
 *                       description: Number of positive reviews
 *                     negative:
 *                       type: integer
 *                       description: Number of negative reviews
 *                     neutral:
 *                       type: integer
 *                       description: Number of neutral reviews
 *                     averageScore:
 *                       type: number
 *                       format: float
 *                       description: Average sentiment score
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid product ID
 */
router.get('/sentiment', getSentimentStats);

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   post:
 *     summary: Create a new review for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - rating
 *               - comment
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error or invalid product ID
 *       404:
 *         description: Product not found
 */
router.post(
  '/',
  validate([
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
  ]),
  createReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error, invalid product/review ID, or review doesn't belong to product
 *       404:
 *         description: Product or review not found
 */
router.put(
  '/:id',
  validate([
    body('author').optional().trim().notEmpty().withMessage('Author name cannot be empty'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().notEmpty().withMessage('Comment cannot be empty')
  ]),
  updateReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid product/review ID or review doesn't belong to product
 *       404:
 *         description: Product or review not found
 */
router.delete('/:id', deleteReview);

export default router; 