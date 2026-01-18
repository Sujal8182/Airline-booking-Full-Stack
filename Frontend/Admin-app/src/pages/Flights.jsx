import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights, toggleFlight } from '../Redux/Reducers/flightSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Flights = () => {
    
    const dispatch = useDispatch();
    const { list , loading , error} = useSelector(s => s.flight);

  useEffect(() => {
    // if(error) toast.error(error)
    dispatch(fetchFlights());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Flights</h2>
        <Link to="/admin/flight/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Flight
        </Link>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th>Flight</th>
              <th>Route</th>
              <th>Aircraft</th>
              <th>Departure</th>
              <th>Seats</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map(f => (
              <tr key={f._id}>
                <td>{f.flightNumber}</td>
                <td>{f.from.code} → {f.to.code}</td>
                <td>{f.aircraft.model}</td>
                <td>{new Date(f.departureTime).toLocaleString()}</td>
                <td>{f.seatsAvailable.economy}</td>
                <td>
                  <button
                    onClick={() => dispatch(toggleFlight(f._id))}
                    className={`px-2 py-1 rounded text-xs ${
                      f.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
  )
}

export default Flights
