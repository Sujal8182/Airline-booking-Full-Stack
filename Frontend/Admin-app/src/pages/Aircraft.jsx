import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAircrafts } from '../Redux/Reducers/AircraftSlice';
import { Link } from 'react-router-dom';

const Aircraft = () => {
      const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.Aircraft);

    useEffect(()=>{
        dispatch(fetchAircrafts())
    },[dispatch])
    if (loading) return <p className="p-6">Loading...</p>;
  return (
   <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Aircraft</h2>
        <Link
          to="/admin/aircraft/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Aircraft
        </Link>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Economy</th>
              <th>Business</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map(a => (
              <tr key={a._id}>
                <td>{a.model}</td>
                <td>{a.manufacturer}</td>
                <td>{a.seatLayout.economy}</td>
                <td>{a.seatLayout.business}</td>
                <td>{a.totalSeats}</td>
                <td>
                  <button
                    onClick={() => dispatch(toggleAircraft(a._id))}
                    className={`px-2 py-1 rounded text-xs ${
                      a.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
  )
}

export default Aircraft
