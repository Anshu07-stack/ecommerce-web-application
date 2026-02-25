import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Pagination,
  Skeleton,
  Alert,
  Chip
} from '@mui/material';
import axios from 'axios';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, page]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
      setError(null);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!query) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Alert severity="info">
          Enter a search term to find products
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {total} products for "{query}"
        </Typography>
      </Box>

      {/* Results */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography color="text.secondary">
            Try searching with different keywords
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {product.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                        ${product.price}
                      </Typography>
                      {product.discountPercentage > 0 && (
                        <Chip 
                          label={`${Math.round(product.discountPercentage)}% OFF`}
                          size="small"
                          color="success"
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/product/${product.id}`}
                      fullWidth
                      variant="contained"
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {total > limit && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage;