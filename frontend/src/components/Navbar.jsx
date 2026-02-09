import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";


const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        🛡️ <span>CityShield</span>
      </div>

      {/* DESKTOP LINKS (login ke baad only) */}
      {user && (
        <div className="nav-links desktop-only">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/alerts">Alerts</NavLink>
          <NavLink to="/street-light">Street Light</NavLink>
          <NavLink to="/waste-collection">Waste Collection</NavLink>
          <NavLink to="/housing-complaints">Housing Complaints</NavLink>
          <NavLink to="/general-issues">Other Issues</NavLink>
        </div>
      )}

      {/* RIGHT SIDE (DESKTOP) */}
      <div className="nav-right desktop-only">
        {!user ? (
          <>
            <NavLink to="/login" className="login-btn">Login</NavLink>
            <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
          </>
        ) : (
          <button className="signup-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {/* HAMBURGER (MOBILE) */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {user && (
            <>
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              <NavLink to="/alerts" onClick={closeMenu}>Alerts</NavLink>
              <NavLink to="/street-light" onClick={closeMenu}>Street Light</NavLink>
              <NavLink to="/waste-collection" onClick={closeMenu}>Waste Collection</NavLink>
              <NavLink to="/housing-complaints" onClick={closeMenu}>Housing Complaints</NavLink>
              <NavLink to="/general-issues" onClick={closeMenu}>Other Issues</NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/signup" onClick={closeMenu}>Sign Up</NavLink>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
