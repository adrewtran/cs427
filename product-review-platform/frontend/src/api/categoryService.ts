import { apiClient } from './client';
import type { Category } from '../types/Category';

interface CategoryResponse {
  success: boolean;
  data: Category;
}

interface CategoriesResponse {
  success: boolean;
  count: number;
  data: Category[];
}

export const categoryService = {
 
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
 
  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },
}; 