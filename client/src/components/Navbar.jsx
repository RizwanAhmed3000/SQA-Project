import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24  object-contain" />
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to={"/"}
              className="text-white text-lg hover:text-gray-200 transition"
            >
              Home
            </Link>

            <button
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
              onClick={() => {
                dispatch(setToken(null));
                dispatch(setUser(null));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
