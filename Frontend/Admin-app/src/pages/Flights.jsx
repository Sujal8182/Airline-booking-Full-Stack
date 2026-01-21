import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights, toggleFlight } from "../Redux/Reducers/flightSlice";
import { Link } from "react-router-dom";

const Flights = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.flight);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading flights…</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Flights
          </h2>
          <p className="text-sm text-gray-500">
            Manage scheduled flights, aircraft assignments, and availability
          </p>
        </div>

        <Link
          to="/admin/flight/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          + Add Flight
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Flight</th>
              <th className="px-6 py-3 text-left font-medium">Route</th>
              <th className="px-6 py-3 text-left font-medium">Aircraft</th>
              <th className="px-6 py-3 text-left font-medium">Departure</th>
              <th className="px-6 py-3 text-center font-medium">
                Economy Seats
              </th>
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
                  No flights scheduled
                </td>
              </tr>
            )}

            {list.map(f => (
              <tr key={f._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {f.flightNumber}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  <span className="font-medium">
                    {f.from.code}
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="font-medium">
                    {f.to.code}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {f.aircraft.model}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {new Date(f.departureTime).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center font-medium text-gray-800">
                  {f.seatsAvailable.economy}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => dispatch(toggleFlight(f._id))}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      f.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {f.isActive ? "Active" : "Disabled"}
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

export default Flights;
