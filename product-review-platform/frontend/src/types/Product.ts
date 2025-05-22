import type { Category } from './Category';

export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  category?: Category;
  price: number;
  dateAdded: string;
  averageRating: number;
} 