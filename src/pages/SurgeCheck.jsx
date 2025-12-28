import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SurgeCheck() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="page">
      <div className="page-content">
        <div className="card">
          <h2>Are you from SURGE?</h2>
          <p>Please choose your background to continue</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/surge-options")}
          >
            Yes, I am from SURGE
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/select")}
          >
            No, Continue Normally
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
