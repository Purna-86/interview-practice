import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Practice Interviews.<br />
          <span>Build Confidence.</span>
        </h1>

        <p className="hero-subtitle">
          Prepare for HR, Technical, AEM, and Java interviews with
          real-time video practice and feedback.
        </p>

        <p className="hero-quote">
          “Success comes from preparation, not luck.”
        </p>

        <div className="hero-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}
