import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAirport } from "../../Redux/Reducers/airportSlice";

const AddAirport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { error, message, loading } = useSelector(state => state.airport);

  const [form, setForm] = useState({
    name: "",
    code: "",
    city: "",
    country: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  };

  const submit = e => {
    e.preventDefault();
    dispatch(createAirport(form));
    if(message){
      navigate('/admin/airports')
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
      
    
  }, [error, message]);

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
          Add Airport
        </h1>
        <p className="text-sm text-gray-500">
          Create a new airport and define its location details.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={submit} className="space-y-5">
          {/* Airport name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Airport Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Indira Gandhi International Airport"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Airport Code
            </label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. DEL"
              className="w-full border rounded-md px-3 py-2 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. New Delhi"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. India"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Saving..." : "Save Airport"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAirport;
