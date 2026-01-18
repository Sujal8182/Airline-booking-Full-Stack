import React from "react";

const Airport = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Airports</h2>
          <p className="text-gray-500 text-sm">
            Manage global airport locations and availability
          </p>
        </div>

        <Link
          to="/admin/airports/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Airport
        </Link>
      </div>
    </div>
  );
};

export default Airport;
