import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("loggedIn");
    sessionStorage.removeItem("recordings");
    navigate("/login");
  };

  const handleBack = () => {
    // ✅ Custom back logic for Result page
    if (location.pathname === "/result") {
      navigate("/surge-check");
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="navbar">
      {/* LEFT: LOGO */}
      <h2 className="logo">
        InterviewPrep &nbsp;
        {loggedIn && user?.fullName && (
          <span className="welcome-text">
            Hi, {user.fullName}
          </span>
        )}
      </h2>

      {/* RIGHT: ACTIONS */}
      <div className="nav-right">
        {!loggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={handleBack}>
              ⬅ Back
            </button>

            <button
              className="nav-btn"
              onClick={() => navigate("/")}
            >
              🏠 Home
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
