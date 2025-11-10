import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
      <Link to="/" className="text-2xl font-serif text-yellow-600">
        ESCO PROJECT
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user && user.isAdmin && (
          <Link
            to="/admin"
            className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
          >
            Admin Dashboard
          </Link>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

        <Link to="/cart">
          <ShoppingCart />
        </Link>
      </div>
    </nav>
  );
}
