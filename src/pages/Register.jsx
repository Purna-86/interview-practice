import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [surge, setSurge] = useState("No");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!fullName ||!email || !password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ fullName, phone, surge, email, password })
    );
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="card">
          <h2>Create Account</h2>

          <label>Full Name</label>
          <input onChange={(e) => setFullName(e.target.value)} />


          <label>Are you from SURGE?</label>
          <select onChange={(e) => setSurge(e.target.value)}>
            <option>No</option>
            <option>Yes</option>
          </select>

          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
