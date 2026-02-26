// Category page - kisi specific category ke products

import { useParams } from 'react-router-dom';
import ProductListingPage from './ProductListingPage';

const CategoryPage = () => {
  const { categoryName } = useParams();
  
  return <ProductListingPage category={categoryName} />;
};

export default CategoryPage;