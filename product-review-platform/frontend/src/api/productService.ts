import { apiClient } from './client';
import type { Product } from '../types/Product';

interface ProductResponse {
  success: boolean;
  data: Product;
}

interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Product[];
}

interface SearchProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export const productService = {
 
  getProducts: async (page: number = 1, limit: number = 10, categoryId?: number): Promise<ProductsResponse> => {
    const params: Record<string, string | number> = { page, limit };
    
    if (categoryId) {
      params.categoryId = categoryId;
    }
    
    const response = await apiClient.get('/products', { params });
    return response.data;
  },
  
 
  getProductById: async (id: number): Promise<ProductResponse> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
 
  searchProducts: async (query: string): Promise<SearchProductsResponse> => {
    const response = await apiClient.get('/products/search', { params: { q: query } });
    return response.data;
  },
  
 
  createProduct: async (product: Omit<Product, 'id' | 'dateAdded' | 'averageRating' | 'category'>): Promise<ProductResponse> => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },
  
 
  updateProduct: async (id: number, product: Partial<Product>): Promise<ProductResponse> => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },
  
 
  deleteProduct: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
}; 