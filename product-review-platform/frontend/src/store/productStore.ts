import { create } from 'zustand';
import type { Product } from '../types/Product';
import type { Category } from '../types/Category';
import { productService } from '../api/productService';
import { categoryService } from '../api/categoryService';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  categories: Category[];
  selectedCategory: number | null;
  searchQuery: string;
  
 
  fetchProducts: (page?: number, limit?: number, categoryId?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  setSelectedCategory: (categoryId: number | null) => void;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      
      const response = await categoryService.getCategories();
      
      set({
        categories: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        loading: false
      });
    }
  },
  
  fetchProducts: async (page = 1, limit = 10, categoryId?: number) => {
    try {
      set({ loading: true, error: null });
      
     
      const categoryIdToUse = categoryId !== undefined ? categoryId : get().selectedCategory || undefined;
      
      const response = await productService.getProducts(page, limit, categoryIdToUse);
      
      set({
        products: response.data,
        totalProducts: response.total,
        currentPage: response.page,
        totalPages: response.pages,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        loading: false
      });
    }
  },
  
  fetchProductById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      
      const response = await productService.getProductById(id);
      
      set({
        currentProduct: response.data,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch product',
        loading: false
      });
    }
  },
  
  searchProducts: async (query: string) => {
    try {
      if (!query.trim()) {
       
        return get().fetchProducts();
      }
      
      set({ loading: true, error: null, searchQuery: query });
      
      const response = await productService.searchProducts(query);
      
      set({
        products: response.data,
        totalProducts: response.count,
        currentPage: 1,
        totalPages: 1,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to search products',
        loading: false
      });
    }
  },
  
  setSelectedCategory: (categoryId: number | null) => {
    set({ selectedCategory: categoryId });
    get().fetchProducts(1, 10, categoryId || undefined);
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  
  clearError: () => set({ error: null })
})); 