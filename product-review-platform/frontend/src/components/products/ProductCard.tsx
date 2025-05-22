import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Rating
} from '@mui/material';
import { 
  ShoppingBag as ShoppingBagIcon, 
  ArrowForward as ArrowIcon,
  Category as CategoryIcon 
} from '@mui/icons-material';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
 
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      {}
      <Box 
        sx={{ 
          position: 'relative', 
          height: '160px',
          background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ShoppingBagIcon sx={{ fontSize: 48, color: '#d8b4fe' }} />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            variant="subtitle1" 
            component="h2" 
            sx={{ 
              fontWeight: 500, 
              mb: 1,
              minHeight: '3rem',
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {product.name}
          </Typography>
        </Link>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1
          }}
        >
          {product.description}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={Number(product.averageRating) || 0} 
              precision={0.5} 
              size="small" 
              readOnly 
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.75rem' }}>
              ({Number(product.averageRating) ? Number(product.averageRating).toFixed(1) : '0.0'})
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Typography variant="h6" component="p" sx={{ fontWeight: 500 }}>
                {formatPrice(product.price)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <CategoryIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="caption" color="text.secondary">
                  {product.category?.name || 'Uncategorized'}
                </Typography>
              </Box>
            </Box>
            
            <Button 
              component={Link} 
              to={`/products/${product.id}`}
              variant="text"
              size="small"
              color="primary"
              endIcon={<ArrowIcon sx={{ fontSize: 16 }} />}
            >
              View
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 