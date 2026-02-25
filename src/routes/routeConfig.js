// Is file mein humare saare routes ki configuration hai
// Ye central config hai jisse hum easily routes manage kar sakte hain

export const ROUTES = {
  HOME: '/',
  MEN: '/men',
  WOMEN: '/women',
  KIDS: '/kids',
  PRODUCT_DETAIL: '/product/:id',
  SEARCH: '/search',
  CATEGORY: '/category/:categoryName',
  CART: '/cart',
  CHECKOUT: '/checkout',
  NOT_FOUND: '/404'
};

// Route ke hisaab se meta data (SEO ke liye kaam ayega)
export const routeMeta = {
  [ROUTES.HOME]: {
    title: 'Fashion Store - Men, Women & Kids Clothing',
    description: 'Shop the latest fashion for men, women and kids'
  },
  [ROUTES.MEN]: {
    title: 'Men\'s Fashion | Clothing, Shoes & Accessories',
    description: 'Explore men\'s latest collection'
  },
  [ROUTES.WOMEN]: {
    title: 'Women\'s Fashion | Dresses, Shoes & Beauty',
    description: 'Discover women\'s trendy fashion'
  },
  [ROUTES.KIDS]: {
    title: 'Kids Fashion | Clothing, Toys & Accessories',
    description: 'Everything for your little ones'
  }
};