import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchProductById, clearError as clearProductError } from '../../redux/slices/productSlice';
import { fetchReviews, clearError as clearReviewError } from '../../redux/slices/reviewSlice';
import type { RootState } from '../../redux/store';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import ReviewList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Rating, 
  Button,
  Divider,
  Container,
  Breadcrumbs
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const dispatch = useAppDispatch();
  
  const {
    currentProduct,
    loading: productLoading,
    error: productError
  } = useAppSelector((state: RootState) => state.product);
  
  const {
    loading: reviewLoading,
    error: reviewError
  } = useAppSelector((state: RootState) => state.review);
  
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchReviews(productId));
    }
  }, [productId, dispatch]);
  
 
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (productLoading) {
    return <LoadingSpinner />;
  }
  
  if (productError) {
    return <ErrorMessage message={productError} onClose={() => dispatch(clearProductError())} />;
  }
  
  if (!currentProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>Product not found</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The product you're looking for doesn't exist or has been removed.
          </Typography>
          <Button 
            component={Link} 
            to="/"
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <ArrowBackIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Back to Products
          </Link>
        </Breadcrumbs>
      </Box>
      
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {}
          <Box sx={{ flex: '1 1 60%' }}>
            <Box mb={1}>
              {currentProduct.category && (
                <Chip 
                  label={currentProduct.category.name} 
                  size="small"
                  sx={{ 
                    backgroundColor: 'primary.50', 
                    color: 'primary.800',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              )}
            </Box>
            
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              {currentProduct.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={Number(currentProduct.averageRating) || 0} 
                precision={0.5} 
                readOnly 
                size="small"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {Number(currentProduct.averageRating) ? Number(currentProduct.averageRating).toFixed(1) : '0.0'} out of 5
              </Typography>
            </Box>
            
            <Typography variant="h5" color="primary.main" fontWeight={600} sx={{ mb: 3 }}>
              {formatPrice(currentProduct.price)}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentProduct.description}
              </Typography>
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              Added on {formatDate(currentProduct.dateAdded)}
            </Typography>
          </Box>
          
          {}
          <Box sx={{ flex: '1 1 40%' }}>
            <Box sx={{ mb: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              
              {reviewError && (
                <ErrorMessage message={reviewError} onClose={() => dispatch(clearReviewError())} />
              )}
            </Box>
            
            <ReviewForm productId={productId} />
            
            <Divider sx={{ my: { xs: 3, sm: 4 } }} />
            
            {reviewLoading ? (
              <LoadingSpinner />
            ) : (
              <ReviewList productId={productId} />
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail; 