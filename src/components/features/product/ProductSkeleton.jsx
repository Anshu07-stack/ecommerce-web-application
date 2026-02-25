// Loading state ke liye skeleton component

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* 8 skeleton cards dikhao */}
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            
            {/* Price and rating skeleton */}
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;