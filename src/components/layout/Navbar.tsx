import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Room Booking Admin</div>

      <div className="navbar-menu">
        <NavLink to="/" end className="nav-item">
          Home
        </NavLink>
        <NavLink to="/rooms" className="nav-item">
          Room
        </NavLink>
        <NavLink to="/bookings" className="nav-item">
          Booking
        </NavLink>
        <NavLink to="/history" className="nav-item">
          History
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
