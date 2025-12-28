import { useNavigate } from "react-router-dom";
import surgeLogo from "../assets/backgrounds/surge-logo-light.png";
import Navbar from "../components/Navbar";

export default function SurgeOptions() {
  const navigate = useNavigate();

  const start = (type) => {
    localStorage.setItem("interviewType", type);
    navigate("/practice");
  };

  return (
    <>
    <Navbar />
    <div className="page surge-bg">
      {/* watermark */}
      <div className="surge-watermark">
        <img src={surgeLogo} alt="SURGE" />
      </div>

      {/* centered card */}
      <div className="surge-card-wrapper">
        <div className="card surge-card">
          <h2>SURGE Interview Tracks</h2>
          <p>Select your specialization</p>

          <button
            className="primary-btn"
            onClick={() => start("aem")}
          >
            AEM Interview
          </button>

          <button
            className="secondary-btn"
            onClick={() => start("java")}
          >
            JAVA Interview
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
