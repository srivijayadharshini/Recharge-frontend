import { useState, useEffect } from 'react';
import { rechargeService } from '../api/rechargeService';

export default function HistoryPage({ history: initialHistory = [] }) {
  const [history, setHistory] = useState(initialHistory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecharges = async () => {
      try {
        const recharges = await rechargeService.getUserRecharges();
        // Format the data to match the expected structure
        const formattedHistory = recharges.map(recharge => ({
          mobile: recharge.mobileNumber,
          operator: recharge.operator,
          planName: recharge.planName,
          amount: recharge.amount,
          status: recharge.status,
          date: new Date(recharge.createdAt).toLocaleString(),
          transactionId: recharge.transactionId,
          userName: recharge.userName,
        }));
        setHistory(formattedHistory);
      } catch (error) {
        console.error('Failed to load recharge history:', error);
        // Fallback to initial history if API fails
        setHistory(initialHistory);
      } finally {
        setLoading(false);
      }
    };

    loadRecharges();
  }, [initialHistory]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 text-gray-600">⏳</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">Loading recharge history...</h3>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 text-gray-600">📋</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No recharge history</h3>
        <p className="text-gray-500">Your recharge transactions will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Recharge History</h2>
        <p className="text-gray-400 mt-2">Your recent recharge transactions</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <p className="text-sm text-gray-400">{history.length} recharge(s) found</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition-colors"
          >
            Print History
          </button>
        </div>

        {history.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800/40 border border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow hover:border-gray-600"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${
                    item.operator === 'Airtel' ? 'bg-gray-900' :
                    item.operator === 'Jio' ? 'bg-gray-900' :
                    item.operator === 'Vi' ? 'bg-gray-900' : 'bg-gray-900'
                  } border ${item.operator === 'Airtel' ? 'border-red-500/30' :
                           item.operator === 'Jio' ? 'border-blue-500/30' :
                           item.operator === 'Vi' ? 'border-purple-500/30' : 'border-orange-500/30'}`}>
                    <span className="text-gray-300">
                      {item.operator === 'Airtel' ? 'A' :
                       item.operator === 'Jio' ? 'J' :
                       item.operator === 'Vi' ? 'Vi' : 'B'}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.operator} Recharge</p>
                    <p className="text-sm text-gray-400">Mobile: {item.mobile}</p>
                    <p className="text-xs text-gray-500">TXN: {item.transactionId}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Amount</span>
                    <p className="font-semibold text-lg text-white">₹{item.amount}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date & Time</span>
                    <p className="font-semibold text-gray-300">{item.date}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 text-gray-300 border border-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Success
                </span>
                <button className="mt-3 text-gray-400 hover:text-gray-300 text-sm font-semibold">
                  View Receipt →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}