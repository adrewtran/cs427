import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSearchQuery, searchProducts } from '../../redux/slices/productSlice';
import type { RootState } from '../../redux/store';
import { 
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  alpha,
  styled
} from '@mui/material';
import { 
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #e0e0e0',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
   
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state: RootState) => state.product);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery));
      dispatch(searchProducts(localSearchQuery));
      navigate('/');
    }
  };
  
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <ShoppingBagIcon sx={{ fontSize: 24, mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" fontWeight="500" color="text.primary">
                Product Reviews
              </Typography>
            </Link>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, mx: 3 }}>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </form>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography 
                component="span" 
                sx={{ 
                  mx: 2, 
                  fontWeight: 500, 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Home
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="small"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      
      {}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setIsMenuOpen(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                  fullWidth
                />
              </Search>
            </form>
          </Box>
          
          <List>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 