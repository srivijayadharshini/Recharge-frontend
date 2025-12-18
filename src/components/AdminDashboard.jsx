import { useState, useEffect } from 'react';
import { userService } from '../api/userService';
import { planService } from '../api/planService';
import { rechargeService } from '../api/rechargeService';

function AdminDashboard({ onLogout, userName, recharges: initialRecharges = [], onPlansUpdate }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [recharges, setRecharges] = useState(initialRecharges);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    operator: 'Airtel',
    price: '',
    validity: '',
    description: '',
    data: '',
    calls: '',
    sms: '',
    popular: false
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, plansData, rechargesData] = await Promise.all([
          userService?.getUsers?.() || [],
          planService?.getPlans?.() || [],
          rechargeService?.getAllRecharges?.() || []
        ]);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setPlans(Array.isArray(plansData) ? plansData : []);
        setRecharges(Array.isArray(rechargesData) ? rechargesData : []);
      } catch (error) {
        console.error('Failed to load data:', error);
        setUsers([]);
        setPlans([]);
        setRecharges([]);
      } finally {
        setDashboardLoading(false);
      }
    };
    setTimeout(loadData, 500);
  }, []);

  if (dashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalUsers: users.length,
    totalPlans: plans.length,
    totalRecharges: recharges.length,
    totalRevenue: recharges.reduce((sum, r) => sum + (parseInt(r.amount?.replace(/[^0-9]/g, '')) || 0), 0),
    successRate: recharges.length > 0 ? ((recharges.filter(r => r.status === 'success').length / recharges.length) * 100).toFixed(1) : 0
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobileNumber?.includes(searchTerm);
    const matchesStatus = userStatusFilter === 'all' || user.role === userStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        if (userService?.deleteUser) {
          await userService.deleteUser(userId);
        }
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        setUsers(users.filter(user => user._id !== userId));
        alert('User removed from list');
      }
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        name: newPlan.name,
        operator: newPlan.operator,
        price: parseInt(newPlan.price),
        validity: newPlan.validity,
        data: newPlan.data || 'N/A',
        calls: newPlan.calls || 'N/A',
        sms: newPlan.sms || 'N/A',
        description: newPlan.description || '',
        popular: newPlan.popular
      };
      const createdPlan = await planService.createPlan(planData);
      console.log('Created plan:', createdPlan);
      const updatedPlans = [...plans, createdPlan];
      setPlans(updatedPlans);
      if (onPlansUpdate) onPlansUpdate(updatedPlans);
      setNewPlan({
        name: '',
        operator: 'Airtel',
        price: '',
        validity: '',
        description: '',
        data: '',
        calls: '',
        sms: '',
        popular: false
      });
      setShowCreatePlan(false);
      alert('Plan created successfully!');
    } catch (error) {
      console.error('Create plan error:', error);
      alert(error.message || 'Failed to create plan. Please check console for details.');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await planService.deletePlan(planId);
        const updatedPlans = plans.filter(plan => plan._id !== planId);
        setPlans(updatedPlans);
        if (onPlansUpdate) onPlansUpdate(updatedPlans);
        alert('Plan deleted successfully!');
      } catch (error) {
        alert(error.message || 'Failed to delete plan');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <header className="bg-gray-900 border-b border-gray-800 shadow-xl sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                  <span className="text-gray-300 font-bold text-lg">MR</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Mobile Recharge Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-white">{userName || 'Administrator'}</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-gray-300 font-semibold border border-gray-700">
                  {userName ? userName.charAt(0).toUpperCase() : 'A'}
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all text-sm font-medium shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'users' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium">Users</span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {users.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'plans' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium">Plans</span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {plans.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('recharges')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'recharges' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium">Recharges</span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {recharges.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                  <p className="text-gray-400 mt-1">Monitor your platform performance and manage operations efficiently.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Users</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Plans</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.totalPlans}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Revenue</p>
                        <p className="text-3xl font-bold text-white mt-2">₹{stats.totalRevenue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Success Rate</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.successRate}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <p className="text-gray-400 mt-1">Monitor and manage customer accounts across the platform</p>
                  </div>
                </div>
                
                {/* Search */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search users by name, email, or phone..."
                        className="w-full pl-4 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <select 
                        value={userStatusFilter}
                        onChange={(e) => setUserStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="all">All Users</option>
                        <option value="User">Regular Users</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-gray-300 font-semibold border border-gray-600">
                                  {user.name?.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{user.name}</div>
                                  <div className="text-sm text-gray-400">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">{user.mobileNumber}</div>
                              <div className="text-sm text-gray-400">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1.5 rounded-full text-xs font-medium border bg-green-900/30 text-green-400 border-green-700">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Plan Management</h2>
                    <p className="text-gray-400 mt-1">Create and manage recharge plans</p>
                  </div>
                  <button
                    onClick={() => setShowCreatePlan(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Plan
                  </button>
                </div>

                {showCreatePlan && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-4">Create New Plan</h3>
                      <form onSubmit={handleCreatePlan} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Plan Name"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                          required
                        />
                        <select
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.operator}
                          onChange={(e) => setNewPlan({...newPlan, operator: e.target.value})}
                        >
                          <option value="Airtel">Airtel</option>
                          <option value="Jio">Jio</option>
                          <option value="Vi">Vi</option>
                          <option value="BSNL">BSNL</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Price"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.price}
                          onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Validity"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.validity}
                          onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Data"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.data}
                          onChange={(e) => setNewPlan({...newPlan, data: e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="Calls"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.calls}
                          onChange={(e) => setNewPlan({...newPlan, calls: e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="SMS"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm"
                          value={newPlan.sms}
                          onChange={(e) => setNewPlan({...newPlan, sms: e.target.value})}
                        />
                        <textarea
                          placeholder="Description"
                          className="w-full p-2 bg-gray-700 text-white rounded-lg text-sm h-16"
                          value={newPlan.description}
                          onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                        />
                        <label className="flex items-center text-white text-sm">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={newPlan.popular}
                            onChange={(e) => setNewPlan({...newPlan, popular: e.target.checked})}
                          />
                          Popular Plan
                        </label>
                        <div className="flex space-x-2 pt-2">
                          <button
                            type="submit"
                            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Create Plan
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCreatePlan(false)}
                            className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div key={plan._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                          <p className="text-gray-400">{plan.operator}</p>
                        </div>
                        {plan.popular && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-2xl font-bold text-white">₹{plan.price}</p>
                        <p className="text-gray-300">Data: {plan.data}</p>
                        <p className="text-gray-300">Validity: {plan.validity}</p>
                        <p className="text-gray-300">Calls: {plan.calls}</p>
                        <p className="text-gray-300">SMS: {plan.sms}</p>
                        {plan.description && (
                          <p className="text-gray-400 text-sm">{plan.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete Plan
                      </button>
                    </div>
                  ))}
                </div>

                {plans.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No plans created yet</p>
                    <p className="text-gray-500 text-sm mt-2">Create your first plan to get started</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recharges' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Recharge History</h2>
                  <p className="text-gray-400 mt-1">Monitor all user recharges and transactions</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Mobile</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {recharges.map((recharge, index) => (
                          <tr key={index} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-white">{recharge.userName || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">{recharge.mobileNumber}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">{recharge.planName}</div>
                              <div className="text-sm text-gray-400">{recharge.operator}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-white">{recharge.amount}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                                recharge.status === 'success' 
                                  ? 'bg-green-900/30 text-green-400 border-green-700'
                                  : recharge.status === 'failed'
                                  ? 'bg-red-900/30 text-red-400 border-red-700'
                                  : 'bg-yellow-900/30 text-yellow-400 border-yellow-700'
                              }`}>
                                {recharge.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">
                                {recharge.date ? new Date(recharge.date).toLocaleDateString() : 'N/A'}
                              </div>
                              <div className="text-sm text-gray-400">
                                {recharge.date ? new Date(recharge.date).toLocaleTimeString() : ''}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {recharges.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No recharges found</p>
                    <p className="text-gray-500 text-sm mt-2">User recharges will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;