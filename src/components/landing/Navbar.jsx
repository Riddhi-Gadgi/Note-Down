import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, PencilLine } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center mr-3">
          <PencilLine className="w-7 h-7 text-white" />
        </div>

        <h1 className="text-black font-bold text-2xl">Note Down</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 font-medium text-gray-500">
        <a
          href="#product"
          className="hover:text-black transition-colors font-semibold"
        >
          Product
        </a>
        <a
          href="#solutions"
          className="hover:text-black transition-colors font-semibold"
        >
          Solutions
        </a>
        <a
          href="#pricing"
          className="hover:text-black transition-colors font-semibold"
        >
          Pricing
        </a>
        <a
          href="#knowmore"
          className="hover:text-black transition-colors font-semibold"
        >
          Know More
        </a>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          to="/login"
          className="text-gray-700 px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className=" top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <a href="/product" className="text-gray-700 hover:text-black">
              Product
            </a>
            <a href="/solutions" className="text-gray-700 hover:text-black">
              Solutions
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-black">
              Pricing
            </a>
            <a href="/knowmore" className="text-gray-700 hover:text-black">
              Know More
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="text-center py-2 border border-gray-300 rounded-full"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-center py-2 bg-black text-white rounded-full"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
