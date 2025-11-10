import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg shadow p-4">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-3 rounded" />
      <h2 className="text-xl font-serif">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
