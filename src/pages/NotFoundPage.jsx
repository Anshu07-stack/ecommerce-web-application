import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routeConfig';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Image or Icon */}
        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        {/* Action Buttons */}
        <div className="space-x-4">
          <Link
            to={ROUTES.HOME}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Popular Categories:</p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link to={ROUTES.MEN} className="text-blue-500 hover:underline">
              Men
            </Link>
            <Link to={ROUTES.WOMEN} className="text-blue-500 hover:underline">
              Women
            </Link>
            <Link to={ROUTES.KIDS} className="text-blue-500 hover:underline">
              Kids
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;