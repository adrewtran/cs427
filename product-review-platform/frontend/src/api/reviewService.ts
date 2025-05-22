import { apiClient } from './client';
import type { Review, SentimentStats } from '../types/Review';

interface ReviewResponse {
  success: boolean;
  data: Review;
}

interface ReviewsResponse {
  success: boolean;
  count: number;
  data: Review[];
}

interface SentimentStatsResponse {
  success: boolean;
  data: SentimentStats;
}

export const reviewService = {
 
  getReviewsByProductId: async (productId: number): Promise<ReviewsResponse> => {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  },
  
 
  getSentimentStats: async (productId: number): Promise<SentimentStatsResponse> => {
    const response = await apiClient.get(`/products/${productId}/reviews/sentiment`);
    return response.data;
  },
  
 
  createReview: async (productId: number, review: Omit<Review, 'id' | 'productId' | 'date'>): Promise<ReviewResponse> => {
    const response = await apiClient.post(`/products/${productId}/reviews`, review);
    return response.data;
  },
  
 
  updateReview: async (
    productId: number, 
    reviewId: number, 
    review: Partial<Omit<Review, 'id' | 'productId' | 'date'>>
  ): Promise<ReviewResponse> => {
    const response = await apiClient.put(`/products/${productId}/reviews/${reviewId}`, review);
    return response.data;
  },
  
 
  deleteReview: async (productId: number, reviewId: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/products/${productId}/reviews/${reviewId}`);
    return response.data;
  }
}; 