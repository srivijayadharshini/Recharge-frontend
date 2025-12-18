import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import { authService } from "./api/authService";
import { planService } from "./api/planService";
import { userService } from "./api/userService";
import { rechargeService } from "./api/rechargeService";

// Pages
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import RechargePage from "./pages/RechargePage";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [plans, setPlans] = useState([]);
  const [userRecharges, setUserRecharges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      // Only check auth, don't auto-redirect
      if (authService.isAuthenticated()) {
        setIsLoggedIn(true);
        const role = authService.getUserRole();
        setIsAdmin(role === 'Admin');
        // Don't auto-redirect to admin page on load
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Load plans for all users, profile only for logged-in users
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansData = await planService.getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Failed to load plans:', error);
        // Set fallback plans when API fails
        setPlans([
          {
            _id: 'fallback-1',
            name: 'Basic Plan',
            operator: 'Airtel',
            price: 199,
            validity: '28 days',
            data: '1.5GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            description: 'Perfect for daily use',
            popular: true
          },
          {
            _id: 'fallback-2',
            name: 'Premium Plan',
            operator: 'Jio',
            price: 399,
            validity: '56 days',
            data: '2GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            description: 'Best value for money',
            popular: true
          },
          {
            _id: 'fallback-3',
            name: 'Super Plan',
            operator: 'Vi',
            price: 479,
            validity: '56 days',
            data: '1.5GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            description: 'Long validity plan',
            popular: false
          },
          {
            _id: 'fallback-4',
            name: 'Economy Plan',
            operator: 'BSNL',
            price: 99,
            validity: '18 days',
            data: '1GB/day',
            calls: 'Unlimited',
            sms: '100/day',
            description: 'Budget-friendly option',
            popular: false
          }
        ]);
      }
    };
    loadPlans();
  }, []);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const profileData = await userService.getUserProfile();
          setUserProfile(profileData);
          setUserName(profileData.name);
        } catch (error) {
          console.error('Failed to load user profile:', error);
        }
      }
    };
    loadUserProfile();
  }, [isLoggedIn]);

  useEffect(() => {
    const loadUserRecharges = async () => {
      if (isLoggedIn) {
        try {
          const recharges = await rechargeService.getUserRecharges();
          // Format the data to match the expected structure for AdminDashboard
          const formattedRecharges = recharges.map(recharge => ({
            mobileNumber: recharge.mobileNumber,
            operator: recharge.operator,
            planName: recharge.planName,
            amount: recharge.amount,
            status: recharge.status,
            date: new Date(recharge.createdAt).toLocaleString(),
            transactionId: recharge.transactionId,
            userName: recharge.userName,
          }));
          setUserRecharges(formattedRecharges);
        } catch (error) {
          console.error('Failed to load user recharges:', error);
          // Keep existing recharges if API fails
        }
      }
    };
    loadUserRecharges();
  }, [isLoggedIn]);

  const handleLoginClick = () => setPage("login");

  const handleLoginSuccess = (email, role) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]); // Temporary name until profile loads
    
    if (role === 'Admin') {
      setIsAdmin(true);
      setPage("admin");
    } else {
      setIsAdmin(false);
      setPage("home");
    }
  };

  // Signup now only creates account and redirects to login
  // Login handles the actual authentication and navigation

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setUserProfile(null);
    setPlans([]);
    setPage("home");
  };

  const switchToSignup = () => setPage("signup");
  const switchToLogin = () => setPage("login");

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // LOGIN PAGE
  if (page === "login") {
    return (
      <Login 
        onSwitch={switchToSignup} 
        onLogin={handleLoginSuccess}
      />
    );
  }

  // SIGNUP PAGE
  if (page === "signup") {
    return (
      <Signup
        onSwitch={switchToLogin}
        onAdminSignup={handleLoginSuccess}
      />
    );
  }

  // ADMIN DASHBOARD
  if (isAdmin) {
    return <AdminDashboard
      onLogout={handleLogout}
      userName={userName}
      recharges={userRecharges}
      onPlansUpdate={setPlans}
      onRechargesUpdate={setUserRecharges}
    />;
  }

  // USER DASHBOARD (Regular User Interface)
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="relative z-10">
        <Navbar
          activePage={page}
          setActivePage={setPage}
          onLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
          theme="dark"
        />

        <div className="flex">
          <Sidebar setPage={setPage} isLoggedIn={isLoggedIn} userProfile={userProfile} theme="dark" />

          <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            
            {/* PROFILE SECTION */}
            {isLoggedIn && page === "home" && userProfile && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white p-5 md:p-6 rounded-xl shadow-lg mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 border-2 border-gray-600">
                      <span className="text-xl font-bold text-white">
                        {userProfile.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">
                        Welcome back, {userProfile.name}!
                      </h2>
                      <p className="text-gray-300 text-sm md:text-base">
                        {userProfile.email} • {userProfile.mobileNumber}
                      </p>
                      <div className="flex items-center mt-2 space-x-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {userProfile.role} Member
                        </span>
                        <span>Joined: {new Date(userProfile.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600 text-center">
                      <p className="text-lg font-bold text-blue-400">{history.length}</p>
                      <p className="text-xs text-gray-400">Recharges</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600 text-center">
                      <p className="text-lg font-bold text-green-400">₹{history.reduce((sum, item) => sum + (item.amount || 0), 0)}</p>
                      <p className="text-xs text-gray-400">Total Spent</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600 text-center">
                      <p className="text-lg font-bold text-purple-400">4.9★</p>
                      <p className="text-xs text-gray-400">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setSelectedOperator("Airtel");
                        setPage("plans");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      Quick Recharge
                    </button>
                    <button
                      onClick={() => setPage("history")}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      View History
                    </button>
                    <button
                      onClick={() => setPage("contact")}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      Support
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE ROUTING */}
            {page === "home" && (
              <HomePage
                setSelectedOperator={setSelectedOperator}
                setPage={setPage}
                plans={plans}
              />
            )}

            {page === "plans" && (
              <div className="animate-fadeIn">
                <PlansPage
                  operator={selectedOperator}
                  isLoggedIn={isLoggedIn}
                  plans={plans}
                  onSelectPlan={({ price, operator }) => {
                    setSelectedOperator(operator);
                    setSelectedAmount(price);
                    setPage("recharge");
                  }}
                />
              </div>
            )}

            {page === "recharge" && (
              <div className="animate-fadeIn">
                <RechargePage
                  presetAmount={selectedAmount}
                  presetOperator={selectedOperator}
                  isLoggedIn={isLoggedIn}
                  onRecharge={(data) => {
                    const newHistory = [...history, data];
                    setHistory(newHistory);
                    setSelectedAmount("");
                    setPage("history");
                  }}
                />
              </div>
            )}

            {page === "history" && (
              <div className="animate-fadeIn">
                <HistoryPage history={history} />
              </div>
            )}

            {page === "contact" && (
              <div className="animate-fadeIn">
                <ContactPage />
              </div>
            )}

            {page === "profile" && (
              <div className="animate-fadeIn">
                <ProfilePage userProfile={userProfile} history={history} />
              </div>
            )}

          </main>
        </div>

        <Footer theme="dark" />
      </div>
    </div>
  );
}



export default App;