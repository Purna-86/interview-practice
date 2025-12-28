import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Result() {
  const navigate = useNavigate();

  const recordings =
    JSON.parse(sessionStorage.getItem("recordings")) || [];

  const [fileNames, setFileNames] = useState(
    recordings.map((_, i) => `Interview_Answer_${i + 1}`)
  );

  /* ================= SAFE GUARD ================= */
  if (!recordings.length) {
    return (
      <>
        <Navbar />
        <div className="page result-page">
          <div className="card">
            <h2>No Results Found</h2>
            <button
              className="primary-btn"
              onClick={() => navigate("/surge-check")}
            >
              Start Practice
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ================= AI-LIKE ANALYSIS ================= */

  const totalTime = recordings.reduce(
    (sum, r) => sum + r.duration,
    0
  );

  const avgTime = totalTime / recordings.length;

  const avgCamera =
    recordings.reduce(
      (sum, r) => sum + r.cameraPresence,
      0
    ) / recordings.length;

  let confidenceLabel = "Low";
  let confidencePercent = 40;
  let paceFeedback = "Too Slow";

  if (avgTime >= 20 && avgTime <= 45) {
    confidenceLabel = "Medium";
    confidencePercent = 65;
    paceFeedback = "Good";
  }

  if (avgTime > 45) {
    confidenceLabel = "High";
    confidencePercent = 85;
    paceFeedback = "Excellent";
  }

  const cameraFeedback =
    avgCamera > 80
      ? "Excellent"
      : avgCamera > 60
      ? "Good"
      : "Needs Improvement";

  /* ================= DOWNLOAD HANDLER ================= */
  const downloadVideo = (videoURL, name) => {
    const a = document.createElement("a");
    a.href = videoURL;
    a.download = `${name}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ================= UI ================= */
  return (
    <>
      <Navbar />
      <div className="page result-page">
        <div className="page-content">
          <div className="card result-card">

            <h2>Interview Summary</h2>

            {/* ================= AI FEEDBACK ================= */}
            <div className="ai-card">
              <h3>AI Interview Feedback</h3>

              <ul>
                <li>🎙 Speaking Pace: <strong>{paceFeedback}</strong></li>
                <li>⏱ Avg Answer Time: <strong>{avgTime.toFixed(1)} sec</strong></li>
                <li>📷 Camera Presence: <strong>{cameraFeedback}</strong></li>
              </ul>

              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>

              <p className={`confidence-text ${confidenceLabel.toLowerCase()}`}>
                Confidence Level: {confidenceLabel} ({confidencePercent}%)
              </p>
            </div>

            {/* ================= RECORDED VIDEOS ================= */}
            <h3>Recorded Answers</h3>

            {recordings.map((r, i) => (
              <div
                key={i}
                className="result-video-block"
                style={{ marginBottom: "28px" }}
              >
                <p>
                  <strong>Question {i + 1}</strong> — {r.duration}s
                </p>

                <video
                  src={r.videoURL}
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />

                {/* ✏️ RENAME INPUT */}
                <input
                  type="text"
                  value={fileNames[i]}
                  onChange={(e) => {
                    const updated = [...fileNames];
                    updated[i] = e.target.value;
                    setFileNames(updated);
                  }}
                  placeholder="Enter file name"
                />

                {/* ⬇ DOWNLOAD */}
                <button
                  className="secondary-btn"
                  onClick={() =>
                    downloadVideo(r.videoURL, fileNames[i])
                  }
                >
                  ⬇ Download
                </button>
              </div>
            ))}

            {/* ================= ACTION BUTTONS ================= */}
            <button
              className="secondary-btn"
              style={{ marginTop: "12px" }}
              onClick={() => navigate("/surge-check")}
            >
              🔁 Practice Again
            </button>

            <button
              className="primary-btn"
              style={{ marginTop: "12px" }}
              onClick={() => navigate("/feedback")}
            >
              ✅ Done
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
