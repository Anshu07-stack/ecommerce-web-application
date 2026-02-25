import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Popper,
  Paper as MenuPaper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}&limit=5`);
      setSuggestions(response.data.products);
      setOpen(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setOpen(false);
    setSearchTerm('');
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%' }} ref={anchorRef}>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
          />
          {searchTerm && (
            <IconButton 
              size="small" 
              onClick={() => {
                setSearchTerm('');
                setSuggestions([]);
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton type="submit" sx={{ p: '10px' }} color="primary">
            {loading ? <CircularProgress size={20} /> : <SearchIcon />}
          </IconButton>
        </Paper>

        {/* Suggestions Dropdown */}
        <Popper
          open={open && suggestions.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          sx={{ width: anchorRef.current?.clientWidth, zIndex: 1300 }}
        >
          <MenuPaper elevation={3} sx={{ mt: 1, maxHeight: 400, overflow: 'auto' }}>
            <List>
              {suggestions.map((product) => (
                <ListItem 
                  key={product.id}
                  button
                  onClick={() => handleSuggestionClick(product)}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <ListItemAvatar>
                    <Avatar src={product.thumbnail} alt={product.title} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.title}
                    secondary={
                      <Typography component="span" variant="body2" color="text.secondary">
                        ${product.price} - {product.category}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </MenuPaper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;