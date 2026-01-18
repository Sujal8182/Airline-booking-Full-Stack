import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAircraft } from "../Redux/Reducers/AircraftSlice";

const AddAircraft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(s => s.Aircraft);

  const [form, setForm] = useState({
    model: "",
    manufacturer: "",
    economy: "",
    business: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();

    dispatch(
      createAircraft({
        model: form.model,
        manufacturer: form.manufacturer,
        seatLayout: {
          economy: Number(form.economy),
          business: Number(form.business || 0)
        },
        totalSeats : Number(form.economy) + Number(form.business)
      })
    ).then(res => {
      if (!res.error) {
        toast.success("Aircraft added successfully");
        navigate('/admin/aircraft')
      }
    });
  };

  useEffect(() => {
    if (error) toast.error(error);

    if (message) toast(message)
  }, [error]);

  return (
    <div className="p-6 max-w-3xl">
      {/* Page header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-2"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Add Aircraft
        </h1>
        <p className="text-sm text-gray-500">
          Create a new aircraft and define its seating capacity.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={submit} className="space-y-5">
          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aircraft Model
            </label>
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="e.g. A320, B737"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <input
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              placeholder="Airbus / Boeing"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Seat layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Economy Seats
              </label>
              <input
                type="number"
                name="economy"
                value={form.economy}
                onChange={handleChange}
                placeholder="e.g. 150"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Seats
              </label>
              <input
                type="number"
                name="business"
                value={form.business}
                onChange={handleChange}
                placeholder="e.g. 12"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm border rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Aircraft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAircraft;
