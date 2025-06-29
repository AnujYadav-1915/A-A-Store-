export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
