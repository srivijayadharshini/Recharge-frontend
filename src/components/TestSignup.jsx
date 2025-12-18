import { useState } from "react";

function TestSignup({ onSwitch, onAdminSignup }) {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg">
        <h1 className="text-white text-2xl mb-4">Test Signup Component</h1>
        {error && <p className="text-red-400">{error}</p>}
        <button 
          onClick={onSwitch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Switch to Login
        </button>
      </div>
    </div>
  );
}

export default TestSignup;