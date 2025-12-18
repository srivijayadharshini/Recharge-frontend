import { useState } from "react";
import { rechargeService } from "../../api/rechargeService";

export default function RechargeForm({ onRecharge, presetAmount, presetOperator, isLoggedIn = true }) {
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState(presetOperator || "");
  const [amount, setAmount] = useState(presetAmount || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecharge = async () => {
    if (!isLoggedIn) {
      setError("Please login to proceed with recharge");
      return;
    }
    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }
    if (!operator) {
      setError("Please select an operator");
      return;
    }
    if (!amount || amount < 10) {
      setError("Enter a valid recharge amount (minimum ₹10)");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const rechargeData = {
        mobileNumber: mobile,
        operator,
        planName: `${operator} Recharge Plan`, // Default plan name
        amount: parseInt(amount),
      };

      const response = await rechargeService.createRecharge(rechargeData);

      alert(`Recharge Successful!\nTransaction ID: ${response.recharge.transactionId}`);
      setLoading(false);

      // Format data for the parent component
      const formattedData = {
        mobileNumber: mobile,
        operator,
        planName: response.recharge.planName,
        amount: response.recharge.amount,
        status: response.recharge.status,
        date: new Date(response.recharge.createdAt).toLocaleString(),
        transactionId: response.recharge.transactionId,
        userName: response.recharge.userName,
      };

      onRecharge(formattedData);
    } catch (error) {
      setError(error.message || "Recharge failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-gray-900 border border-gray-700 text-red-400 p-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Mobile Number
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            +91
          </span>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full pl-12 p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent text-white text-lg placeholder-gray-500"
            placeholder="Enter 10-digit number"
            maxLength={10}
          />
        </div>
      </div>

      {/* Operator */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Select Operator
        </label>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent text-white text-lg appearance-none"
        >
          <option value="" className="bg-gray-800">Choose an operator</option>
          <option value="Airtel" className="bg-gray-800">Airtel</option>
          <option value="Jio" className="bg-gray-800">Reliance Jio</option>
          <option value="Vi" className="bg-gray-800">Vodafone Idea (Vi)</option>
          <option value="BSNL" className="bg-gray-800">BSNL</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Recharge Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent text-white text-lg placeholder-gray-500"
          placeholder="Enter amount"
          min="10"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {[99, 199, 399, 599, 999].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                amount == amt
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 bg-gray-900'
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleRecharge}
        disabled={loading || !isLoggedIn}
        className={`w-full p-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border ${
          !isLoggedIn 
            ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
      >
        {!isLoggedIn ? (
          'Login Required to Recharge'
        ) : loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Recharge ₹${amount || '0'} Now`
        )}
      </button>

      {/* Security Note */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-700">
        {!isLoggedIn ? (
          <p className="text-yellow-400">
            ⚠️ Please login to proceed with recharge
          </p>
        ) : (
          <p className="flex items-center justify-center gap-2">
            🔒 Your transaction is secured with 256-bit SSL encryption
          </p>
        )}
      </div>
    </div>
  );
}