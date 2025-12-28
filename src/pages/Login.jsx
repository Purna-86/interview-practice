import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not registered");
      return;
    }

    if (email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/surge-check");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="page login-bg">
      <div className="page-content">
        <div className="card">
          <h2>Welcome Back</h2>

          <p className="quote">
            “Preparation today builds confidence tomorrow.”
          </p>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Login
          </button>

          <p style={{ marginTop: "12px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#fbcfe8" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
