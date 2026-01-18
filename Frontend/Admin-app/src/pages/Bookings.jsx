import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking, fetchBookings } from "../Redux/Reducers/bookingSlice";

const Bookings = () => {
    const dispatch = useDispatch()
    const { list = [], loading} = useSelector(state => state.booking)

    useEffect(()=>{
        dispatch(fetchBookings())
    },[dispatch])

     if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th>User</th>
              <th>Flight</th>
              <th>Passengers</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {list.map((b) => (
              <tr key={b._id}>
                <td>
                  <div className="font-medium">{b.user?.name}</div>
                  <div className="text-xs text-gray-500">{b.user?.email}</div>
                </td>

                <td>
                  {b.flight?.from?.code} → {b.flight?.to?.code}
                </td>

                <td>{b.passengers.length}</td>

                <td>₹{b.totalPrice}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="text-right">
                  {b.status === "confirmed" && (
                    <button
                      onClick={() => dispatch(cancelBooking(b._id))}
                      className="text-red-600 text-xs"
                    >
                      Cancel
                    </button>
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
