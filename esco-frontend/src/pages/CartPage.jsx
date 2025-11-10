import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-serif text-yellow-600 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2 border-b">
                {item.name} <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-4 font-bold">Total: ${total}</h2>
          <Link to="/checkout">
            <button className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
