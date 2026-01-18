import React from "react";

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0">
      <h1 className="text-lg font-semibold text-gray-800">Airports</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>
        <button className="text-red-500">Logout</button>
      </div>
    </header>
  );
};

export default Header;
