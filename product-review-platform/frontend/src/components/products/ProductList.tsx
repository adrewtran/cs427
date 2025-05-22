import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchProducts, clearError } from '../../redux/slices/productSlice';
import type { RootState } from '../../redux/store';
import type { Product } from '../../types/Product';
import type { Category } from '../../types/Category';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Pagination from '../common/Pagination';
import CategoryFilter from './CategoryFilter';
import { 
  Container, 
  Box, 
  Typography, 
  Paper
} from '@mui/material';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    categories,
    loading,
    error,
    currentPage,
    totalPages,
    selectedCategory,
    searchQuery
  } = useAppSelector((state: RootState) => state.product);
  
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);
  
 
  const getCategoryName = () => {
    if (!selectedCategory) return null;
    const category = categories.find((cat: Category) => cat.id === selectedCategory);
    return category ? category.name : null;
  };
  
  const handlePageChange = (page: number) => {
    dispatch(fetchProducts({ page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategory
            ? `${getCategoryName()} Products`
            : 'All Products'}
        </Typography>
      </Box>
      
      {error && <ErrorMessage message={error} onClose={() => dispatch(clearError())} />}
      
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '250px' }, flexShrink: 0 }}>
          <CategoryFilter />
        </Box>
        
        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : selectedCategory
                  ? `No products found in the "${getCategoryName()}" category`
                  : 'No products found'}
              </Typography>
            </Paper>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
                {products.map((product: Product) => (
                  <Box 
                    key={product.id} 
                    sx={{ 
                      mb: 2,
                      height: '100%',
                      p: 1,
                      transform: 'translateZ(0)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList; 