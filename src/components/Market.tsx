export default function Market() {
  return (
    <div className="h-screen bg-green-500">
      {/* Header */}
      <div className="p-4">
        <div className="text-white flex items-center">
          <button className="text-lg">Back</button>
        </div>
        <h1 className="text-4xl font-bold text-center text-white mt-4">Market</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-lg p-6 mt-4">
        {/* Video/Image Placeholder */}
        <div className="bg-gray-200 rounded-lg w-full h-40 flex items-center justify-center mb-8">
          <button className="w-16 h-16 bg-transparent border-4 border-green-500 rounded-full text-green-500 text-3xl">
            ▶
          </button>
        </div>

        {/* Hot Deals Section */}
        <h2 className="text-xl font-semibold mb-4">Hot deals</h2>
        <div className="flex space-x-4 mb-8">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 text-center w-24">
              <div className="bg-gray-300 h-24 w-full rounded-lg mb-2"></div>
              <p className="text-sm">Item #1 Name Goes Here</p>
              <p className="text-sm font-bold">$19.99</p>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        <h2 className="text-xl font-semibold mb-4">Trending</h2>
        <div className="flex space-x-4">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 text-center w-24">
              <div className="bg-gray-300 h-24 w-full rounded-lg mb-2"></div>
              <p className="text-sm">Item #1 Name Goes Here</p>
              <p className="text-sm font-bold">$19.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};