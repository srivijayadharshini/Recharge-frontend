import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in successfully!");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* LOGIN FORM */}
        {isLogin && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter Password"
                required
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {!isLogin && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Create Password"
                required
              />
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Create Account
            </button>
          </form>
        )}

        {/* SWITCH BUTTON */}
        <p className="text-center mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
