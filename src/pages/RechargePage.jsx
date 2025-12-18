import RechargeForm from "../components/ui/RechargeForm";

export default function RechargePage({ presetAmount, presetOperator, onRecharge, isLoggedIn = true }) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Mobile Recharge</h2>
        <p className="text-gray-400 mt-2">Fill in the details below to proceed</p>
      </div>
      <RechargeForm
        presetAmount={presetAmount}
        presetOperator={presetOperator}
        onRecharge={onRecharge}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}