import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/common/Navbar';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import { 
  Box, 
  Container, 
  Typography, 
  Divider,
  Stack,
  Link as MuiLink
} from '@mui/material';
import { ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee',
      light: '#9c4dff',
      dark: '#0000ba',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03dac6',
      light: '#66fff8',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '#' },
      { name: 'Contact', path: '#' }
    ],
    categories: [
      { name: 'Electronics', path: '#' },
      { name: 'Wearables', path: '#' },
      { name: 'Audio', path: '#' },
      { name: 'Home Appliances', path: '#' },
      { name: 'Gaming', path: '#' },
      { name: 'Smart Home', path: '#' }
    ]
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        borderTop: 1, 
        borderColor: 'divider',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={4} 
          sx={{ mb: 4 }}
          flexWrap="wrap"
        >
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 40%', md: '0 1 30%' } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <ShoppingBagIcon fontSize="small" sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
                Product Reviews
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
              Your trusted platform for honest product reviews. Find the perfect products with ratings and feedback from real users.
            </Typography>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%', md: '0 1 30%' } }}>
            <Typography 
              variant="overline" 
              fontWeight="medium" 
              color="text.primary"
              sx={{ letterSpacing: 1, display: 'block', mb: 2 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.quickLinks.map((link) => (
                <MuiLink
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 25%', md: '0 1 30%' } }}>
            <Typography 
              variant="overline" 
              fontWeight="medium" 
              color="text.primary"
              sx={{ letterSpacing: 1, display: 'block', mb: 2 }}
            >
              Categories
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.categories.map((category) => (
                <MuiLink
                  key={category.name}
                  component={RouterLink}
                  to={category.path}
                  underline="hover"
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {category.name}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Product Review Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <Navbar />
          <Container component="main" maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
