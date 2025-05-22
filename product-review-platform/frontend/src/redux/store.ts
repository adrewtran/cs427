import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import reviewReducer from './slices/reviewSlice';
import type { ProductState } from './slices/productSlice';
import type { ReviewState } from './slices/reviewSlice';

export interface RootState {
  product: ProductState;
  review: ReviewState;
}

export const store = configureStore({
  reducer: {
    product: productReducer,
    review: reviewReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 