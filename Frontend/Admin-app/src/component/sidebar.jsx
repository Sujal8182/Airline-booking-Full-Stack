import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout } from "../Redux/Reducers/adminSlice";
import { useDispatch } from "react-redux";

const nav = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Airports", path: "/admin/airports" },
  { name: "Aircraft", path: "/admin/aircraft" },
  { name: "Flights", path: "/admin/flight" },
  { name: "Bookings", path: "/admin/booking" },
];

const Sidebar = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());

    // 3. Redirect to login
    navigate("/", { replace: true });
  };

  return (
    <aside className="w-64 h-screen bg-[#0770E3] text-white fixed">
      <div className="p-6 text-xl font-bold tracking-wide">
        SkyAdmin
      </div>

      <nav className="mt-6 space-y-1">
        {nav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-6 py-3 text-sm rounded-r-full transition ${
                isActive
                  ? "bg-white text-[#0770E3] font-semibold"
                  : "text-blue-100 hover:bg-blue-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

       {/* Logout */}
      <div className="p-4 border px-4 rounded-[30%] absolute left-[20%] bottom-1.5 flex cursor-pointer text-blue-500 text-lg bg-white hover:text-white hover:bg-blue-500">
        <button
          onClick={handleLogout}
          className=" text-center px-4 cursor-pointer rounded-md   font-bold    transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
