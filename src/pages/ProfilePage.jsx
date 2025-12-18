import { useState, useEffect } from 'react';
import { userService } from '../api/userService';

function ProfilePage({ userProfile, history = [], onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });

  useEffect(() => {
    if (userProfile) {
      setEditData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        mobileNumber: userProfile.mobileNumber || ''
      });
    }
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalRecharges: history.length,
    totalSpent: history.reduce((sum, item) => sum + (item.amount || 0), 0),
    successfulRecharges: history.filter(item => item.status === 'success').length,
    membershipDays: Math.floor((new Date() - new Date(userProfile.createdAt)) / (1000 * 60 * 60 * 24))
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfile = await userService.updateProfile(editData);
      if (onProfileUpdate) onProfileUpdate(updatedProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: userProfile.name,
      email: userProfile.email,
      mobileNumber: userProfile.mobileNumber
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your account information and view your activity</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 border-4 border-gray-600">
              <span className="text-3xl font-bold text-white">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{userProfile.name}</h2>
              <p className="text-gray-400 text-lg">{userProfile.role} Member</p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-400 text-sm font-medium">Active Account</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-600 text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.totalRecharges}</p>
            <p className="text-sm text-gray-400">Total Recharges</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-600 text-center">
            <p className="text-2xl font-bold text-green-400">₹{stats.totalSpent}</p>
            <p className="text-sm text-gray-400">Total Spent</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-600 text-center">
            <p className="text-2xl font-bold text-purple-400">{stats.successfulRecharges}</p>
            <p className="text-sm text-gray-400">Successful</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-600 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.membershipDays}</p>
            <p className="text-sm text-gray-400">Days Member</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="bg-gray-700 p-3 rounded-lg text-white border border-gray-600">{userProfile.name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="bg-gray-700 p-3 rounded-lg text-white border border-gray-600">{userProfile.email}</div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.mobileNumber}
                  onChange={(e) => setEditData({...editData, mobileNumber: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="bg-gray-700 p-3 rounded-lg text-white border border-gray-600">{userProfile.mobileNumber}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Account Type</label>
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {userProfile.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        )}

        {/* Account Details */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <span className="text-gray-400">Member Since:</span>
              <p className="text-white font-medium">{new Date(userProfile.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <span className="text-gray-400">Last Updated:</span>
              <p className="text-white font-medium">{new Date(userProfile.updatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <span className="text-gray-400">Account Status:</span>
              <p className="text-green-400 font-medium">✓ Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;