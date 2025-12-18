import { useState } from "react";
import { authService } from "../api/authService";

function Signup({ onSwitch, onAdminSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    accountType: "user" // "user" or "admin"
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleAccountTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      accountType: type
    }));
  };

  const validateForm = () => {
    const { name, email, mobileNumber, password, confirmPassword, accountType } =
      formData;

    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return false;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }

    if (accountType === "admin" && !email.endsWith("@admin.com")) {
      setError("Admin accounts must use @admin.com email domain");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
        role: formData.accountType === "admin" ? "Admin" : "User"
      };

      await authService.register(userData);

      setSuccessMessage("Account created successfully!");
      setError("");

      // If admin account, auto-login and navigate to dashboard
      if (formData.accountType === "admin") {
        try {
          await authService.login({
            email: formData.email,
            password: formData.password
          });
          
          setSuccessMessage("Admin account created! Redirecting to dashboard...");
          
          setTimeout(() => {
            if (onAdminSignup) {
              onAdminSignup(formData.email, "Admin");
            }
          }, 1500);
          
        } catch {
          setSuccessMessage("Account created! Please login to continue.");
          setTimeout(() => {
            onSwitch();
          }, 1500);
        }
      } else {
        // Regular user - redirect to login
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
          accountType: "user"
        });
        
        setTimeout(() => {
          onSwitch();
        }, 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(
        error.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              MobileRecharge
            </h1>
            <p className="text-gray-400">Create your account</p>
          </div>

          {/* Account Type */}
          <div className="mb-6">
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                onClick={() => handleAccountTypeChange("user")}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.accountType === "user"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
                }`}
              >
                User Account
              </button>

              <button
                type="button"
                onClick={() => handleAccountTypeChange("admin")}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.accountType === "admin"
                    ? "bg-blue-900/30 border-blue-700 text-blue-300"
                    : "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
                }`}
              >
                Admin Account
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              {formData.accountType === "admin"
                ? "Admin accounts have access to dashboard and management features"
                : "User accounts can recharge and view history"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="mb-6 p-3 bg-green-900/30 border border-green-800 rounded-lg">
              <p className="text-green-300 text-sm text-center">
                {successMessage}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={
                formData.accountType === "admin"
                  ? "Admin Email (name@admin.com)"
                  : "Email Address"
              }
              className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />

            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              maxLength="10"
              className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full mb-6 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold ${
                formData.accountType === "admin"
                  ? "bg-blue-700"
                  : "bg-gray-700"
              } text-white`}
            >
              {isLoading
                ? "Creating Account..."
                : `Sign Up as ${
                    formData.accountType === "admin" ? "Admin" : "User"
                  }`}
            </button>
          </form>

          {/* Switch */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-gray-300 font-semibold hover:text-white"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;