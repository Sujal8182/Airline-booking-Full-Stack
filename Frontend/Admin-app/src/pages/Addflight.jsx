import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAirports } from "../Redux/Reducers/airportSlice";
import { fetchAircrafts } from "../Redux/Reducers/AircraftSlice";
import { createFlight } from "../Redux/Reducers/flightSlice";

const Addflight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const airportlist = useSelector(
          state => state.airport.airports?.airports || []
      )
  const { list: aircraftList} = useSelector(s => s.Aircraft);
  const { loading, error } = useSelector(s => s.flight || []);

  const [form, setForm] = useState({
    flightNumber: "",
    from: "",
    to: "",
    aircraft: "",
    departureTime: "",
    arrivalTime: "",
    economyPrice: "",
    businessPrice: ""
  });

  useEffect(() => {
    dispatch(fetchAirports());
    dispatch(fetchAircrafts());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();

    dispatch(
      createFlight({
        flightNumber: form.flightNumber,
        from: form.from,
        to: form.to,
        aircraft: form.aircraft,
        departureTime: new Date(form.departureTime),
        arrivalTime: new Date(form.arrivalTime),
        price: {
          economy: Number(form.economyPrice),
          business: Number(form.businessPrice || 0)
        }
      })
    ).then(res => {
      if (!res.error) {
        toast.success("Flight created successfully");
        navigate("/admin/flight");
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-2"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Add Flight
        </h1>
        <p className="text-sm text-gray-500">
          Create a new flight by selecting route, aircraft, and schedule.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={submit} className="space-y-6">
          {/* Flight number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Flight Number
            </label>
            <input
              name="flightNumber"
              value={form.flightNumber}
              onChange={handleChange}
              placeholder="e.g. AI-203"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Route */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                From
              </label>
              <select
                name="from"
                value={form.from}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="">Select airport</option>
                {airportlist.map(a => (
                  <option key={a._id} value={a._id}>
                    {a.code} — {a.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                To
              </label>
              <select
                name="to"
                value={form.to}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="">Select airport</option>
                {airportlist.map(a => (
                  <option key={a._id} value={a._id}>
                    {a.code} — {a.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Aircraft */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Aircraft
            </label>
            <select
              name="aircraft"
              value={form.aircraft}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select aircraft</option>
              {aircraftList
                .filter(a => a.isActive)
                .map(a => (
                  <option key={a._id} value={a._id}>
                    {a.model} ({a.totalSeats} seats)
                  </option>
                ))}
            </select>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departureTime"
                value={form.departureTime}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={form.arrivalTime}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Economy Price
              </label>
              <input
                type="number"
                name="economyPrice"
                value={form.economyPrice}
                onChange={handleChange}
                placeholder="₹"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Business Price
              </label>
              <input
                type="number"
                name="businessPrice"
                value={form.businessPrice}
                onChange={handleChange}
                placeholder="₹ (optional)"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Flight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addflight;
