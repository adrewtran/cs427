import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCategories, setSelectedCategory, fetchProducts } from '../../redux/slices/productSlice';
import type { RootState } from '../../redux/store';
import type { Category } from '../../types/Category';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Box,
  Skeleton
} from '@mui/material';
import { FilterList as FilterIcon, Check as CheckIcon } from '@mui/icons-material';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { 
    categories, 
    selectedCategory, 
    loading 
  } = useAppSelector((state: RootState) => state.product);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  const handleCategoryChange = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchProducts({ page: 1 }));
  };
  
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="subtitle2">Categories</Typography>
      </Box>
      
      {loading && categories.length === 0 ? (
       
        [...Array(5)].map((_, i) => (
          <Skeleton key={i} height={36} sx={{ my: 0.5 }} />
        ))
      ) : (
        <List sx={{ '& .MuiListItem-root': { p: 0 } }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleCategoryChange(null)}
              selected={selectedCategory === null}
              sx={{
                borderRadius: 1,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.50',
                  color: 'primary.900',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                  },
                },
              }}
            >
              <ListItemText 
                primary="All Categories" 
                primaryTypographyProps={{ 
                  fontSize: '0.875rem', 
                  fontWeight: selectedCategory === null ? 500 : 400 
                }} 
              />
              {selectedCategory === null && (
                <CheckIcon fontSize="small" sx={{ color: 'primary.main', fontSize: 16 }} />
              )}
            </ListItemButton>
          </ListItem>
          
          {categories.map((category: Category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                onClick={() => handleCategoryChange(category.id)}
                selected={selectedCategory === category.id}
                sx={{
                  borderRadius: 1,
                  py: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.50',
                    color: 'primary.900',
                    '&:hover': {
                      backgroundColor: 'primary.50',
                    },
                  },
                }}
              >
                <ListItemText 
                  primary={category.name} 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem', 
                    fontWeight: selectedCategory === category.id ? 500 : 400 
                  }} 
                />
                {selectedCategory === category.id && (
                  <CheckIcon fontSize="small" sx={{ color: 'primary.main', fontSize: 16 }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CategoryFilter; 