import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../auth/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/connexion");
  }

  return (
    <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__brand">
          SPORTSEE
        </div>

        {/* Right pill */}
        <nav className="navbar__pill">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Mon profil
          </NavLink>

          <span className="navbar__divider" />

          <button className="navbar__logout" onClick={handleLogout}>
            Se déconnecter
          </button>
        </nav>
      </div>
    </header>
  );
}