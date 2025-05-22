import pool from '../config/database.js';
import { ProductModel } from './Product.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Review {
  id?: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
  date?: Date;
}


interface ReviewRow extends RowDataPacket, Review {
  sentiment_score?: number; 
}


interface SentimentStatsRow extends RowDataPacket {
  positive: number | string;
  negative: number | string;
  neutral: number | string;
  averageScore: number | string;
}

export class ReviewModel {
 
  static async getReviewsByProductId(productId: number): Promise<Review[]> {
    const [reviews] = await pool.query<ReviewRow[]>(
      'SELECT * FROM reviews WHERE productId = ? ORDER BY date DESC',
      [productId]
    );
    
    return reviews.map(review => ({
      ...review,
      sentimentScore: review.sentiment_score,
    }));
  }
  
 
  static async getReviewById(id: number): Promise<Review | null> {
    const [rows] = await pool.query<ReviewRow[]>('SELECT * FROM reviews WHERE id = ?', [id]);
    
    if (rows.length === 0) return null;
    
    const review = rows[0];
    return {
      ...review,
      sentimentScore: review.sentiment_score,
    };
  }
  
 
  static async createReview(review: Review): Promise<number> {
    const { productId, author, rating, comment, sentiment, sentimentScore } = review;
    
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO reviews (productId, author, rating, comment, sentiment, sentiment_score) VALUES (?, ?, ?, ?, ?, ?)',
      [productId, author, rating, comment, sentiment, sentimentScore]
    );
    
    await ProductModel.updateProductRating(productId);
    
    return result.insertId;
  }
  
 
  static async updateReview(id: number, review: Partial<Review>): Promise<boolean> {
    const existingReview = await this.getReviewById(id);
    if (!existingReview) {
      return false;
    }
    
    const allowedUpdates = ['author', 'rating', 'comment', 'sentiment', 'sentimentScore'];
    const updates: string[] = [];
    const values: any[] = [];
    
    if (review.rating !== undefined && (review.rating < 1 || review.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    for (const [key, value] of Object.entries(review)) {
      if (allowedUpdates.includes(key) && value !== undefined) {
        const dbKey = key === 'sentimentScore' ? 'sentiment_score' : key;
        updates.push(`${dbKey} = ?`);
        values.push(value);
      }
    }
    
    if (updates.length === 0) {
      return false;
    }
    
    values.push(id);
    
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE reviews SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    await ProductModel.updateProductRating(existingReview.productId);
    
    return result.affectedRows > 0;
  }
  
 
  static async deleteReview(id: number): Promise<boolean> {
    const review = await this.getReviewById(id);
    if (!review) {
      return false;
    }
    
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM reviews WHERE id = ?', [id]);
    
    await ProductModel.updateProductRating(review.productId);
    
    return result.affectedRows > 0;
  }
  
 
  static async getProductSentimentStats(productId: number): Promise<{
    positive: number;
    negative: number;
    neutral: number;
    averageScore: number;
  }> {
    const [results] = await pool.query<SentimentStatsRow[]>(
      `SELECT 
        COUNT(CASE WHEN sentiment = 'positive' THEN 1 END) as positive,
        COUNT(CASE WHEN sentiment = 'negative' THEN 1 END) as negative,
        COUNT(CASE WHEN sentiment = 'neutral' THEN 1 END) as neutral,
        AVG(sentiment_score) as averageScore
      FROM reviews
      WHERE productId = ? AND sentiment IS NOT NULL`,
      [productId]
    );
    
    const stats = results[0] || {
      positive: 0,
      negative: 0,
      neutral: 0,
      averageScore: 0
    };
    
    return {
      positive: Number(stats.positive) || 0,
      negative: Number(stats.negative) || 0,
      neutral: Number(stats.neutral) || 0,
      averageScore: Number(stats.averageScore) || 0
    };
  }
} 