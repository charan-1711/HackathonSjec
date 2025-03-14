import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signin",
        { email, password }
      );

      console.log("Login Successful:", response.data);

      const token = response.data.token;
      console.log(token);

      localStorage.setItem("token", token);

      alert("Login Successful!");
      navigate("/admin");
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response?.data || "Something went wrong"
      );
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
<<<<<<< HEAD
    <>
      <h1>Login page</h1>
      
    </>
=======
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login to QPGS
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          onClick={loginUser}
        >
          Login
        </button>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
>>>>>>> c54069660d04e24981255f88bf7b0714c8a633cc
  );
}
