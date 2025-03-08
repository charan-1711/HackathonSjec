export default function Login() {
    return (
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
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          {/* Role Selection (Optional) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Role
            </label>
            <select className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Admin</option>
              <option>Teacher</option>
              <option>Exam Staff</option>
            </select>
          </div>

           {/* Password Input */}
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          {/* Login Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
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
    );
  }
  