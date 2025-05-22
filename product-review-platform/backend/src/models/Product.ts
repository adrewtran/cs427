import pool from '../config/database.js';
import type { Category } from './Category.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Product {
  id?: number;
  name: string;
  description: string;
  categoryId: number;
  category?: Category;
  price: number;
  dateAdded?: Date;
  averageRating?: number;
}

interface ProductRowWithCategory extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  dateAdded: Date;
  averageRating: number;
  categoryName: string;
  categoryDescription: string;
}

interface CountResult extends RowDataPacket {
  total: number;
}

export class ProductModel {
 
  static async getAllProducts(
    page: number = 1, 
    limit: number = 10, 
    categoryId?: number
  ): Promise<{ products: Product[], total: number }> {
    try {
      
      const parsedPage = typeof page === 'string' ? parseInt(page) : page;
      const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit;
      
      const safePage = Math.max(1, Math.floor(parsedPage));
      const safeLimit = Math.max(1, Math.floor(parsedLimit));
      
      const offset = (safePage - 1) * safeLimit;
      
      let whereClause = '';
      const params = [];
      
      if (categoryId !== undefined && categoryId !== null) {
        whereClause = ' WHERE p.categoryId = ?';
        params.push(categoryId);
      }
      
      const countSql = `
        SELECT COUNT(*) as total 
        FROM products p
        JOIN categories c ON p.categoryId = c.id
        ${whereClause}
      `;
      
      
      const [countRows] = await pool.query<CountResult[]>(countSql, params);
      const total = countRows[0]?.total || 0;
      
      
      if (total === 0) {
        return { products: [], total: 0 };
      }
      

      const maxPage = Math.ceil(total / safeLimit);
      

      const effectivePage = Math.min(safePage, maxPage);


      const effectiveOffset = (effectivePage - 1) * safeLimit;
      
      const productSql = `
        SELECT 
          p.id, 
          p.name, 
          p.description, 
          p.categoryId, 
          p.price, 
          p.dateAdded, 
          p.averageRating,
          c.name as categoryName, 
          c.description as categoryDescription
        FROM products p
        JOIN categories c ON p.categoryId = c.id
        ${whereClause}
        ORDER BY p.dateAdded DESC, p.id ASC
        LIMIT ? OFFSET ?
      `;
      
      const productParams = [...params, safeLimit, effectiveOffset];
      
      
      const [productRows] = await pool.query<ProductRowWithCategory[]>(productSql, productParams);
      
      
      const products = productRows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        categoryId: row.categoryId,
        price: row.price,
        dateAdded: row.dateAdded,
        averageRating: row.averageRating,
        category: {
          id: row.categoryId,
          name: row.categoryName,
          description: row.categoryDescription
        }
      }));
      
      return { products, total };
    } catch (error) {
      throw error;
    }
  }
  
 
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    const query = `
      SELECT p.*, c.name as categoryName, c.description as categoryDescription 
      FROM products p
      JOIN categories c ON p.categoryId = c.id
      WHERE p.name LIKE ? 
      ORDER BY p.dateAdded DESC
    `;
    const [productsResult] = await pool.query<ProductRowWithCategory[]>(query, [`%${searchTerm}%`]);
    
    return productsResult.map(product => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        dateAdded: product.dateAdded,
        averageRating: product.averageRating,
        category: {
          id: product.categoryId,
          name: product.categoryName,
          description: product.categoryDescription
        }
      };
    });
  }
  
 
  static async getProductById(id: number): Promise<Product | null> {
    const query = `
      SELECT p.*, c.name as categoryName, c.description as categoryDescription 
      FROM products p
      JOIN categories c ON p.categoryId = c.id
      WHERE p.id = ?
    `;
    
    const [rows] = await pool.query<ProductRowWithCategory[]>(query, [id]);
    
    if (rows.length === 0) return null;
    
    const product = rows[0];
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price,
      dateAdded: product.dateAdded,
      averageRating: product.averageRating,
      category: {
        id: product.categoryId,
        name: product.categoryName,
        description: product.categoryDescription
      }
    };
  }
  
 
  static async createProduct(product: Product): Promise<number> {
    const { name, description, categoryId, price } = product;
    
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO products (name, description, categoryId, price) VALUES (?, ?, ?, ?)',
      [name, description, categoryId, price]
    );
    
    return result.insertId;
  }
  
 
  static async updateProduct(id: number, product: Partial<Product>): Promise<boolean> {
    const allowedUpdates = ['name', 'description', 'categoryId', 'price'];
    const updates: string[] = [];
    const values: any[] = [];
    
    for (const [key, value] of Object.entries(product)) {
      if (allowedUpdates.includes(key) && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (updates.length === 0) {
      return false;
    }
    
    values.push(id);
    
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }
  
 
  static async deleteProduct(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
    
    // Return true if any rows were affected
    return result.affectedRows > 0;
  }
  
 
  static async updateProductRating(productId: number): Promise<void> {
    await pool.query(
      `UPDATE products
      SET averageRating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE productId = ?
      )
      WHERE id = ?`, 
      [productId, productId]
    );
  }
} 