import FeatureRow from "../components/ui/FeatureRow";

export default function PlanPage({ operator, onSelectPlan, isLoggedIn, plans }) {
  // Filter plans by operator
  const operatorPlans = plans.filter(plan => plan.operator === operator);

  const handleRechargeClick = (plan) => {
    if (!isLoggedIn) {
      alert("Please login first to proceed with recharge.");
      return;
    }
    onSelectPlan({ price: plan.price, operator });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          {operator} Recharge Plans
        </h1>
        <p className="text-gray-400">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {operatorPlans.length > 0 ? operatorPlans.map((p, index) => (
          <div
            key={index}
            className={`bg-gray-800/60 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border ${
              p.popular 
                ? 'border-gray-600 shadow-gray-900/50' 
                : 'border-gray-700'
            } hover:shadow-xl transition-all duration-300`}
          >
            {p.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <span className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full border border-gray-600">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-5 md:mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xl md:text-2xl font-bold text-white">₹{p.price}</span>
                  <span className="text-sm text-gray-500 ml-2">+ taxes</span>
                </div>
                {p.popular && (
                  <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full border border-gray-600">
                    RECOMMENDED
                  </span>
                )}
              </div>
              
              <div className="mt-2">
                <p className="text-base md:text-lg font-semibold text-white">{p.data}</p>
                <p className="text-gray-400">Validity: {p.validity}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-5 md:mb-6">
              <FeatureRow icon="Calls:" text={p.calls} />
              <FeatureRow icon="SMS:" text={p.sms} />
              {p.description && <FeatureRow icon="Info:" text={p.description} />}
            </div>

            {/* Recharge Button */}
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isLoggedIn
                  ? p.popular
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border border-gray-600'
                    : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700'
                  : 'bg-gray-800 cursor-not-allowed text-gray-500 border border-gray-700'
              }`}
              disabled={!isLoggedIn}
              onClick={() => handleRechargeClick(p)}
            >
              {isLoggedIn ? 'Recharge Now' : 'Login to Recharge'}
            </button>
          </div>
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No plans available for {operator}</p>
            <p className="text-gray-500 text-sm mt-2">Plans will be added by admin soon</p>
          </div>
        )}
      </div>
    </div>
  );
}