import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirports } from "../../Redux/Reducers/airportSlice";
import { Link } from "react-router-dom";

const Airportlist = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.airport);

  const airportlist = useSelector(
    state => state.airport.airports?.airports || []
  );

  useEffect(() => {
    dispatch(fetchAirports());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading airports…</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Airports
          </h2>
          <p className="text-sm text-gray-500">
            Manage global airport locations and availability
          </p>
        </div>

        <Link
          to="/admin/airports/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          + Add Airport
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Code</th>
              <th className="px-6 py-3 text-left font-medium">City</th>
              <th className="px-6 py-3 text-left font-medium">Country</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {airportlist.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No airports found
                </td>
              </tr>
            )}

            {airportlist.map(a => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {a.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {a.code}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {a.city}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {a.country}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      a.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Airportlist;
