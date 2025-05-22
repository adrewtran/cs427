import pool from '../config/database.js';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

interface CategoryRow extends RowDataPacket, Category {}

interface CountResult extends RowDataPacket {
  count: number;
}

export class CategoryModel {
 
  static async getAllCategories(): Promise<Category[]> {
    const query = 'SELECT * FROM categories ORDER BY name ASC';
    const [categories] = await pool.query<CategoryRow[]>(query);
    
    return categories as Category[];
  }
 
  static async getCategoryById(id: number): Promise<Category | null> {
    const [rows] = await pool.query<CategoryRow[]>('SELECT * FROM categories WHERE id = ?', [id]);
    
    return rows.length > 0 ? rows[0] as Category : null;
  }
} 