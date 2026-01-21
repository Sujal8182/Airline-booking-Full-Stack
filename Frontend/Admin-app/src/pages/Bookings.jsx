import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking, fetchBookings } from "../Redux/Reducers/bookingSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { list = [], loading } = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading bookings…</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bookings
        </h2>
        <p className="text-sm text-gray-500">
          Review customer bookings, passenger counts, and payment status
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Customer</th>
              <th className="px-6 py-3 text-left font-medium">Route</th>
              <th className="px-6 py-3 text-center font-medium">
                Passengers
              </th>
              <th className="px-6 py-3 text-left font-medium">Total</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {list.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}

            {list.map(b => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">
                    {b.user?.name || "Guest User"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {b.user?.email}
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  <span className="font-medium">
                    {b.flight?.from?.code}
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="font-medium">
                    {b.flight?.to?.code}
                  </span>
                </td>

                <td className="px-6 py-4 text-center font-medium text-gray-800">
                  {b.passengers.length}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  ₹{b.totalPrice}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  {b.status === "confirmed" ? (
                    <button
                      onClick={() => dispatch(cancelBooking(b._id))}
                      className="text-red-600 text-xs font-medium hover:underline"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
