import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Feedback() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    sessionStorage.setItem(
      "finalFeedback",
      JSON.stringify({ feedback, rating })
    );

    // ✅ show success animation
    setSubmitted(true);

    // ⏱ redirect after animation
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <>
      <div className="page">
        <div className="page-content">
          <div className="card">

            {!submitted ? (
              <>
                <h2>⭐ Interview Feedback</h2>
                <p>Your feedback helps us improve your experience.</p>

                {/* ⭐ STAR RATING */}
                <div className="rating-container">
                  <p>Rate your interview experience</p>

                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={rating >= star ? "star active" : "star"}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="rating-text">
                    {rating === 0
                      ? "No rating selected"
                      : `You rated ${rating} / 5`}
                  </p>
                </div>

                {/* 📝 FEEDBACK */}
                <textarea
                  placeholder="Share your thoughts about the interview..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />

                <button
                  className="primary-btn"
                  onClick={submitFeedback}
                >
                  Submit Feedback
                </button>
              </>
            ) : (
              /* ✅ SUCCESS ANIMATION */
              <div className="success-container">
                <div className="success-check">✓</div>
                <h2>Thank You!</h2>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
