export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
}

export interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  averageScore: number;
} 