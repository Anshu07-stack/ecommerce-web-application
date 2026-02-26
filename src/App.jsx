import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import CartDrawer from './components/features/cart/CartDrawer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <CartDrawer /> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;