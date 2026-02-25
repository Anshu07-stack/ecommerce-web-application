import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FashionStore</h3>
            <p className="text-sm text-gray-600">
              Your one-stop shop for latest fashion trends for men, women and kids.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.MEN} className="text-gray-600 hover:text-blue-600">
                  Men
                </Link>
              </li>
              <li>
                <Link to={ROUTES.WOMEN} className="text-gray-600 hover:text-blue-600">
                  Women
                </Link>
              </li>
              <li>
                <Link to={ROUTES.KIDS} className="text-gray-600 hover:text-blue-600">
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-blue-600">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-2">
              Subscribe to get updates on new arrivals
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="grow px-3 py-2 text-sm border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r hover:bg-blue-700">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} FashionStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;