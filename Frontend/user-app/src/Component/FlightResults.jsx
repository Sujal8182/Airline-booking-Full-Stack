import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FlightResults = () => {
  const [params] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5050/airline/users/search",
          {
            from: params.get("from"),
            to: params.get("to"),
            departDate: params.get("date"),
            adults: 1,
            children: 0,
            infants: 0,
            cabin: "Economy"
          }
        );
        setData(res.data);
      } catch (err) {
        toast(err.response?.data?.message || "Failed to fetch flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <p className="p-6">Loading flights...</p>;

  if (!data?.flights?.length) {
    return <p className="p-6">No flights found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Flights {data.search.from} → {data.search.to}
      </h2>

      {data.flights.map(f => (
        <div
          key={f._id}
          className="bg-white shadow rounded p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">
              {f.from.code} → {f.to.code}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(f.departureTime).toLocaleTimeString()} –{" "}
              {new Date(f.arrivalTime).toLocaleTimeString()}
            </div>
            <div className="text-xs text-gray-400">
              Aircraft: {f.aircraft.model}
            </div>
          </div>

          <div className="text-right">
            <div className="font-semibold text-lg">
              ₹{f.price.economy}
            </div>
            <Link
              to={`/flights/${f._id}`}
              className="text-blue-600 text-sm"
            >
              Select →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
