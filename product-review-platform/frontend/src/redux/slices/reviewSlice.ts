import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Review, SentimentStats } from '../../types/Review';
import { reviewService } from '../../api/reviewService';

export interface ReviewState {
  reviews: Review[];
  sentimentStats: SentimentStats | null;
  sentimentLoading: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  sentimentStats: null,
  sentimentLoading: false,
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await reviewService.getReviewsByProductId(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch reviews');
    }
  }
);

export const fetchSentimentStats = createAsyncThunk(
  'review/fetchSentimentStats',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await reviewService.getSentimentStats(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch sentiment statistics');
    }
  }
);

export const addReview = createAsyncThunk(
  'review/addReview',
  async ({ 
    productId, 
    review 
  }: { 
    productId: number; 
    review: Omit<Review, 'id' | 'productId' | 'date'> 
  }, 
  { dispatch, rejectWithValue }
  ) => {
    try {
      await reviewService.createReview(productId, review);
      
     
      return dispatch(fetchReviews(productId)).unwrap();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add review');
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({ 
    productId, 
    reviewId, 
    review 
  }: { 
    productId: number; 
    reviewId: number; 
    review: Partial<Omit<Review, 'id' | 'productId' | 'date'>> 
  }, 
  { dispatch, rejectWithValue }
  ) => {
    try {
      await reviewService.updateReview(productId, reviewId, review);
      
     
      return dispatch(fetchReviews(productId)).unwrap();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update review');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async ({ 
    productId, 
    reviewId 
  }: { 
    productId: number; 
    reviewId: number
  }, 
  { dispatch, rejectWithValue }
  ) => {
    try {
      await reviewService.deleteReview(productId, reviewId);
      
     
      return dispatch(fetchReviews(productId)).unwrap();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete review');
    }
  }
);

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
     
      .addCase(fetchSentimentStats.pending, (state) => {
        state.sentimentLoading = true;
        state.error = null;
      })
      .addCase(fetchSentimentStats.fulfilled, (state, action) => {
        state.sentimentStats = action.payload;
        state.sentimentLoading = false;
      })
      .addCase(fetchSentimentStats.rejected, (state, action) => {
        state.sentimentLoading = false;
        state.error = action.payload as string;
      })
      
     
     
     
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer; 