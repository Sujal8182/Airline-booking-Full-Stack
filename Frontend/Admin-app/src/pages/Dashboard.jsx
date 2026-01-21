import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardstats } from "../Redux/Reducers/DashboardSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error, message } = useSelector(
    (state) => state.Dashboard,
  );

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);

    dispatch(fetchDashboardstats());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;

  const StatCard = ({ label, value }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value ?? "—"}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard label="Airports" value={stats?.airports} />
        <StatCard label="Aircraft" value={stats?.aircraft} />
        <StatCard label="Flights" value={stats?.flights} />
        <StatCard label="Bookings" value={stats?.bookings} />
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">System Overview</h3>
        <p className="text-sm text-gray-500">
          Manage global airports, aircraft fleet, scheduled flights, and
          customer bookings from a centralized control panel.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
