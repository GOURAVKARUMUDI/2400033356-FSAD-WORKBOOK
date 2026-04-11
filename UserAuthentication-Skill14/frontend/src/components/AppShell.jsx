import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearUserSession } from "../storage";

export default function AppShell({ sessionUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserSession();
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Skill 14 Project</p>
          <h1>Authentication Dashboard</h1>
        </div>

        <div className="topbar-actions">
          <nav className="nav-links">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>

          <button className="secondary-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="content-card">
        <div className="content-header">
          <div>
            <p className="eyebrow">Logged in as</p>
            <h2>{sessionUser?.username}</h2>
          </div>
          <span className="badge">User ID: {sessionUser?.id}</span>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

