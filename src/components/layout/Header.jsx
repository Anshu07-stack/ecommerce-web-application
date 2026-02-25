import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../routes/routeConfig';

const Header = () => {
  // Cart count - abhi ke liye placeholder, baad mein Redux se ayega
  const cartCount = 0;

  const navLinks = [
    { path: ROUTES.MEN, label: 'Men' },
    { path: ROUTES.WOMEN, label: 'Women' },
    { path: ROUTES.KIDS, label: 'Kids' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="text-2xl font-bold text-gray-800">
            FASHION<span className="text-blue-600">STORE</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-blue-600
                  ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side - Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search - temporary, will be replaced with component */}
            <Link 
              to={ROUTES.SEARCH} 
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link 
              to={ROUTES.CART} 
              className="p-2 text-gray-600 hover:text-blue-600 relative"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                  text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;