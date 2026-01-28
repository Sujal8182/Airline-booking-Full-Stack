import { Link, useLocation } from "react-router-dom";
import "./SkyHeader.css";

const SkyHeader = ({ summary }) => {
  const location = useLocation();

  return (
    <header className="sky-header">
      {/* LEFT */}
      <div className="sky-left">
        <span className="sky-logo">✈</span>
        <span className="sky-brand">SkyRoute</span>
      </div>

      {/* CENTER */}
      {summary && (
        <div className="sky-search-pill">
          {summary}
        </div>
      )}

      {/* RIGHT */}
      <div className="sky-right">
        <Link to="/my-bookings" className="sky-link">
          My bookings
        </Link>

        <Link to="/login">
          <button className="sky-login-btn">Log in</button>
        </Link>
      </div>
    </header>
  );
};

export default SkyHeader;
