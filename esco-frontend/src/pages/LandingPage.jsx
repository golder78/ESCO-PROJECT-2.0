import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg"; // your background image

export default function LandingPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // temporary login check

  const handleShopNow = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Navbar */}
      {/* <nav className="absolute top-0 right-0 flex gap-4 p-6">
        <button
          onClick={() => navigate("/about")}
          className="border border-white text-white px-3 py-1 text-sm hover:bg-white hover:text-black transition"
        >
          ABOUT
        </button>
        <button
          onClick={() => navigate("/login")}
          className="border border-white text-white px-3 py-1 text-sm hover:bg-white hover:text-black transition"
        >
          LOGIN
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="border border-white text-white px-3 py-1 text-sm hover:bg-white hover:text-black transition"
        >
          SIGNUP
        </button>
      </nav> */}

      {/* Main Text */}
      <div className="absolute bottom-32 left-20 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to ESCO Project</h1>
        <button
          onClick={handleShopNow}
          className="mt-8 bg-white text-black px-6 py-3 font-semibold hover:bg-gold hover:text-white transition"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
