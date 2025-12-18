export default function PlanItem({ operator, price, data, validity, popular }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-lg border border-gray-700 hover:bg-gray-800/60 transition-colors">
      <div>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white">₹{price}</span>
          {popular && (
            <span className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full border border-gray-600">
              Popular
            </span>
          )}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {data} • {validity}
        </div>
      </div>
      <div className="text-sm text-gray-400">{operator}</div>
    </div>
  );
}