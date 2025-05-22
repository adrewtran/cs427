import { useState } from 'react';
import type { Review } from '../../types/Review';
import { useAppDispatch } from '../../redux/hooks';
import { deleteReview } from '../../redux/slices/reviewSlice';
import ReviewForm from './ReviewForm';
import { 
  Box,
  Typography,
  Rating,
  Paper,
  Button,
  Stack,
  Divider,
  Chip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  DeleteOutline as DeleteIcon,
  SentimentSatisfiedAlt as SentimentPositiveIcon,
  SentimentNeutral as SentimentNeutralIcon,
  SentimentVeryDissatisfied as SentimentNegativeIcon
} from '@mui/icons-material';

interface ReviewItemProps {
  review: Review;
  productId: number;
}

const ReviewItem = ({ review, productId }: ReviewItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview({ productId, reviewId: review.id }));
    }
  };

  const getSentimentColor = () => {
    if (!review.sentiment) return 'default';
    
    switch (review.sentiment) {
      case 'positive':
        return 'success';
      case 'neutral':
        return 'default';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };
  
  if (isEditing) {
    return (
      <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <ReviewForm 
          productId={productId} 
          reviewToEdit={review} 
          onCancel={() => setIsEditing(false)} 
        />
      </Paper>
    );
  }
  
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={500}>
          {review.author}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDate(review.date)}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
        <Rating 
          value={review.rating} 
          readOnly 
          size="small" 
        />
        
        {review.sentiment && (
          <Chip
            icon={review.sentiment === 'positive' ? <SentimentPositiveIcon fontSize="small" /> :
                  review.sentiment === 'neutral' ? <SentimentNeutralIcon fontSize="small" /> :
                  <SentimentNegativeIcon fontSize="small" />}
            label={review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
            size="small"
            color={getSentimentColor()}
            variant="outlined"
            sx={{ ml: 1, height: 24 }}
          />
        )}
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        {review.comment}
      </Typography>
      
      <Divider sx={{ mb: 1.5 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1}>
          <Button 
            startIcon={<EditIcon fontSize="small" />}
            size="small"
            onClick={() => setIsEditing(true)}
            sx={{ textTransform: 'none' }}
            color="primary"
          >
            Edit
          </Button>
          <Button 
            startIcon={<DeleteIcon fontSize="small" />}
            size="small"
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ReviewItem; 