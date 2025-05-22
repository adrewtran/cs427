import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addReview, updateReview } from '../../redux/slices/reviewSlice';
import type { RootState } from '../../redux/store';
import type { Review } from '../../types/Review';
import {
  TextField,
  Button,
  Rating,
  Typography,
  Box,
  Stack
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

interface ReviewFormProps {
  productId: number;
  reviewToEdit?: Review;
  onCancel?: () => void;
}

const ReviewForm = ({ productId, reviewToEdit, onCancel }: ReviewFormProps) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.review);
  
 
  useEffect(() => {
    if (reviewToEdit) {
      setAuthor(reviewToEdit.author);
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  }, [reviewToEdit]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!author.trim()) {
      newErrors.author = 'Name is required';
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Comment is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (reviewToEdit) {
     
      await dispatch(updateReview({
        productId,
        reviewId: reviewToEdit.id,
        review: {
          author,
          rating,
          comment
        }
      }));
      
      if (onCancel) {
        onCancel();
      }
    } else {
     
      await dispatch(addReview({
        productId,
        review: {
          author,
          rating,
          comment
        }
      }));
      
     
      setAuthor('');
      setRating(5);
      setComment('');
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        label="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        error={!!errors.author}
        helperText={errors.author}
        margin="normal"
        variant="outlined"
      />
      
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography component="legend" variant="body2" color="text.secondary" gutterBottom>
          Rating
        </Typography>
        <Rating 
          name="rating"
          value={rating}
          onChange={(_, newValue) => {
            if (newValue !== null) {
              setRating(newValue);
            }
          }}
          size="medium"
        />
      </Box>
      
      <TextField
        fullWidth
        size="small"
        label="Review"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        error={!!errors.comment}
        helperText={errors.comment}
        margin="normal"
        variant="outlined"
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Stack direction="row" spacing={1}>
          {onCancel && (
            <Button 
              variant="outlined"
              color="inherit" 
              onClick={onCancel} 
              size="medium"
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            size="medium"
            disabled={loading}
            endIcon={<SendIcon fontSize="small" />}
          >
            {loading ? 'Submitting...' : reviewToEdit ? 'Update Review' : 'Submit Review'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ReviewForm; 