import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAircrafts, toggleAircraft } from "../Redux/Reducers/AircraftSlice";
import { Link } from "react-router-dom";

const Aircraft = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.Aircraft);

  useEffect(() => {
    dispatch(fetchAircrafts());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading aircraft…</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Aircraft Fleet
          </h2>
          <p className="text-sm text-gray-500">
            Manage aircraft models, seat configurations, and availability
          </p>
        </div>

        <Link
          to="/admin/aircraft/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          + Add Aircraft
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Model</th>
              <th className="px-6 py-3 text-left font-medium">Manufacturer</th>
              <th className="px-6 py-3 text-center font-medium">Economy</th>
              <th className="px-6 py-3 text-center font-medium">Business</th>
              <th className="px-6 py-3 text-center font-medium">Total Seats</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {list.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No aircraft found
                </td>
              </tr>
            )}

            {list.map(a => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {a.model}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {a.manufacturer}
                </td>
                <td className="px-6 py-4 text-center text-gray-700">
                  {a.seatLayout.economy}
                </td>
                <td className="px-6 py-4 text-center text-gray-700">
                  {a.seatLayout.business}
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-800">
                  {a.totalSeats}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => dispatch(toggleAircraft(a._id))}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      a.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {a.isActive ? "Active" : "Disabled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aircraft;
