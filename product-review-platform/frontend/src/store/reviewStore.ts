import { create } from 'zustand';
import type { Review } from '../types/Review';
import { reviewService } from '../api/reviewService';

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  
 
  fetchReviews: (productId: number) => Promise<void>;
  addReview: (productId: number, review: Omit<Review, 'id' | 'productId' | 'date'>) => Promise<void>;
  updateReview: (productId: number, reviewId: number, review: Partial<Omit<Review, 'id' | 'productId' | 'date'>>) => Promise<void>;
  deleteReview: (productId: number, reviewId: number) => Promise<void>;
  clearError: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  loading: false,
  error: null,
  
  fetchReviews: async (productId: number) => {
    try {
      set({ loading: true, error: null });
      
      const response = await reviewService.getReviewsByProductId(productId);
      
      set({
        reviews: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch reviews',
        loading: false
      });
    }
  },
  
  addReview: async (productId: number, review: Omit<Review, 'id' | 'productId' | 'date'>) => {
    try {
      set({ loading: true, error: null });
      
      await reviewService.createReview(productId, review);
      
     
      const response = await reviewService.getReviewsByProductId(productId);
      
      set({
        reviews: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add review',
        loading: false
      });
    }
  },
  
  updateReview: async (
    productId: number, 
    reviewId: number, 
    review: Partial<Omit<Review, 'id' | 'productId' | 'date'>>
  ) => {
    try {
      set({ loading: true, error: null });
      
      await reviewService.updateReview(productId, reviewId, review);
      
     
      const response = await reviewService.getReviewsByProductId(productId);
      
      set({
        reviews: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update review',
        loading: false
      });
    }
  },
  
  deleteReview: async (productId: number, reviewId: number) => {
    try {
      set({ loading: true, error: null });
      
      await reviewService.deleteReview(productId, reviewId);
      
     
      const response = await reviewService.getReviewsByProductId(productId);
      
      set({
        reviews: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete review',
        loading: false
      });
    }
  },
  
  clearError: () => set({ error: null })
})); 