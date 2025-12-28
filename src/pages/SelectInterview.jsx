import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SelectInterview() {
  const navigate = useNavigate();

  const selectType = (type) => {
    localStorage.setItem("interviewType", type);
    navigate("/practice");
  };

  return (
    <>
    <Navbar />
    <div className="page">
      <div className="page-content">
        <div className="card">
          <h2>Select Interview Type</h2>
          <p>Select your specialization</p>

          <button
            className="primary-btn"
            onClick={() => selectType("hr")}
          >
            HR Interview
          </button>

          <button
            className="secondary-btn"
            onClick={() => selectType("technical")}
          >
            Technical Interview
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
