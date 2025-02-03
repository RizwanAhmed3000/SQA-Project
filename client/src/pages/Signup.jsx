import React, { useState } from "react";
import { signup } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";

const Signup = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await signup(formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-2xl p-10 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600">Start your journey with us</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <svg
                className="w-6 h-6 mr-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {[
            { id: "name", type: "text", icon: User, placeholder: "Full Name" },
            {
              id: "email",
              type: "email",
              icon: Mail,
              placeholder: "Email Address",
            },
            {
              id: "phone",
              type: "tel",
              icon: Phone,
              placeholder: "Phone Number",
            },
            {
              id: "password",
              type: "password",
              icon: Lock,
              placeholder: "Password",
            },
          ].map(({ id, type, icon: Icon, placeholder }) => (
            <div key={id} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={id}
                type={type}
                required
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 py-3"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing up...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
