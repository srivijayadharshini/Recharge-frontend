import { useState } from 'react';

function SimpleAdminDashboard({ onLogout, userName }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome, {userName || 'Admin'}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-400">0</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Total Recharges</h3>
            <p className="text-3xl font-bold text-green-400">0</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-yellow-400">₹0</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Manage Users
            </button>
            <button className="p-4 bg-green-600 text-white rounded hover:bg-green-700">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleAdminDashboard;