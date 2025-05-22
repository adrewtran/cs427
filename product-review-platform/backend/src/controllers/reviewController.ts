import { Request, Response, NextFunction } from 'express';
import { ReviewModel, Review } from '../models/Review.js';
import { ProductModel } from '../models/Product.js';
import { AppError } from '../middlewares/errorHandler.js';
import { analyzeSentiment } from '../services/aiService.js';

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId);
    
    if (isNaN(productId)) {
      return next(new AppError('Invalid product ID', 400));
    }
    
   
    const product = await ProductModel.getProductById(productId);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
    const reviews = await ReviewModel.getReviewsByProductId(productId);
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId);
    
    if (isNaN(productId)) {
      return next(new AppError('Invalid product ID', 400));
    }
    
   
    const product = await ProductModel.getProductById(productId);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
   
    const reviewData: Review = {
      ...req.body,
      productId
    };
    
   
    if (reviewData.comment) {
      try {
        const sentimentResult = await analyzeSentiment(reviewData.comment);
        reviewData.sentiment = sentimentResult.sentiment;
        reviewData.sentimentScore = sentimentResult.score;
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
       
      }
    }
    
   
    const reviewId = await ReviewModel.createReview(reviewData);
    const review = await ReviewModel.getReviewById(reviewId);
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.id);
    
    if (isNaN(productId) || isNaN(reviewId)) {
      return next(new AppError('Invalid product ID or review ID', 400));
    }
    
   
    const product = await ProductModel.getProductById(productId);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
   
    const review = await ReviewModel.getReviewById(reviewId);
    
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    
    if (review.productId !== productId) {
      return next(new AppError('Review does not belong to this product', 400));
    }
    
   
    const updates: Partial<Review> = req.body;
    
   
    if (updates.comment) {
      try {
        const sentimentResult = await analyzeSentiment(updates.comment);
        updates.sentiment = sentimentResult.sentiment;
        updates.sentimentScore = sentimentResult.score;
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
       
      }
    }
    
    const updated = await ReviewModel.updateReview(reviewId, updates);
    
    if (!updated) {
      return next(new AppError('Failed to update review', 400));
    }
    
    const updatedReview = await ReviewModel.getReviewById(reviewId);
    
    res.status(200).json({
      success: true,
      data: updatedReview
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.id);
    
    if (isNaN(productId) || isNaN(reviewId)) {
      return next(new AppError('Invalid product ID or review ID', 400));
    }
    
   
    const product = await ProductModel.getProductById(productId);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
   
    const review = await ReviewModel.getReviewById(reviewId);
    
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    
    if (review.productId !== productId) {
      return next(new AppError('Review does not belong to this product', 400));
    }
    
   
    const deleted = await ReviewModel.deleteReview(reviewId);
    
    if (!deleted) {
      return next(new AppError('Failed to delete review', 400));
    }
    
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getSentimentStats = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.params.productId);
    
    if (isNaN(productId)) {
      return next(new AppError('Invalid product ID', 400));
    }
    
   
    const product = await ProductModel.getProductById(productId);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
    const stats = await ReviewModel.getProductSentimentStats(productId);
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
}; 