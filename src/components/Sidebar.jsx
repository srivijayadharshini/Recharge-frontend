function Sidebar({ setPage, isLoggedIn, userProfile }) {
  return (
    <aside className="w-64 bg-white/40 backdrop-blur-md h-screen shadow-md p-6">
      {/* User Profile Section */}
      {isLoggedIn && userProfile && (
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-white">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{userProfile.name}</h3>
              <p className="text-gray-400 text-xs">{userProfile.role}</p>
            </div>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>{userProfile.email}</p>
            <p>{userProfile.mobileNumber}</p>
          </div>
        </div>
      )}
      
      <h2 className=" text-3xl text-gray-300 font-bold mb-4">Menu</h2>

      <ul className="space-y-2 text-lg font-bold">
        <li
          className="hover:bg-gray-300 p-2 rounded cursor-pointer"
          onClick={() => setPage("home")}
        >
          Dashboard
        </li>

        <li
          className="hover:bg-gray-300 p-2 rounded cursor-pointer"
          onClick={() => setPage("recharge")}
        >
          Recharge
        </li>

        <li
          className="hover:bg-gray-300 p-2 rounded cursor-pointer"
          onClick={() => setPage("history")}
        >
          History
        </li>

        {isLoggedIn && (
          <li
            className="hover:bg-gray-300 p-2 rounded cursor-pointer"
            onClick={() => setPage("profile")}
          >
            Profile
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
