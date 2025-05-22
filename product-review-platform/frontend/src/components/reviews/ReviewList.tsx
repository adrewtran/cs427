import { useMemo, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import ReviewItem from './ReviewItem';
import SentimentSummary from './SentimentSummary';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import {
  SentimentSatisfiedAlt as SentimentPositiveIcon,
  SentimentNeutral as SentimentNeutralIcon,
  SentimentVeryDissatisfied as SentimentNegativeIcon,
  FilterAlt as FilterIcon
} from '@mui/icons-material';

interface ReviewListProps {
  productId: number;
}

type SentimentFilter = 'all' | 'positive' | 'neutral' | 'negative';

const ReviewList = ({ productId }: ReviewListProps) => {
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const { reviews } = useAppSelector((state: RootState) => state.review);
  
 
  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];
    
   
    if (sentimentFilter !== 'all') {
      filtered = filtered.filter(review => review.sentiment === sentimentFilter);
    }
    
   
    return filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [reviews, sentimentFilter]);
  
  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: SentimentFilter,
  ) => {
    if (newFilter !== null) {
      setSentimentFilter(newFilter);
    }
  };
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }
  
  return (
    <div>
      <SentimentSummary productId={productId} />
      
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ mr: 2 }}>Filter by sentiment:</Typography>
        <ToggleButtonGroup
          value={sentimentFilter}
          exclusive
          onChange={handleFilterChange}
          size="small"
          aria-label="sentiment filter"
        >
          <ToggleButton value="all" aria-label="all reviews">
            All
          </ToggleButton>
          <ToggleButton value="positive" aria-label="positive reviews">
            <SentimentPositiveIcon fontSize="small" sx={{ mr: 0.5 }} />
            Positive
          </ToggleButton>
          <ToggleButton value="neutral" aria-label="neutral reviews">
            <SentimentNeutralIcon fontSize="small" sx={{ mr: 0.5 }} />
            Neutral
          </ToggleButton>
          <ToggleButton value="negative" aria-label="negative reviews">
            <SentimentNegativeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Negative
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {filteredReviews.length === 0 ? (
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No {sentimentFilter !== 'all' ? sentimentFilter : ''} reviews available.
          </Typography>
        </Box>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <ReviewItem key={review.id} review={review} productId={productId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList; 