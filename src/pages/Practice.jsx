import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Recorder from "../components/Recorder";

const QUESTIONS = {
  hr: [
    "Tell me about yourself",
    "What are your strengths?"
  ],
  technical: [
    "What is React?",
    "Explain REST API"
  ],
  aem: [
    "What is Adobe Experience Manager?",
    "Explain AEM architecture",
    "What are AEM components?"
  ],
  java: [
    "What is JVM?",
    "Difference between JDK and JRE",
    "Explain OOPS concepts"
  ]
};

export default function Practice() {
  const navigate = useNavigate();

  const type = localStorage.getItem("interviewType");
  const questions = QUESTIONS[type] || [];

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);

  /* ================= HANDLE RECORD FINISH ================= */
  const onFinish = (recordingData) => {
    setResults((prev) => {
      const updated = [...prev, recordingData];

      sessionStorage.setItem(
        "recordings",
        JSON.stringify(updated)
      );

      if (updated.length === questions.length) {
        navigate("/result");
      } else {
        setIndex((i) => i + 1);
      }

      return updated;
    });
  };

  if (!questions.length) {
    return (
      <div className="page practice-page">
        <p>No interview selected</p>
      </div>
    );
  }

  return (
  <div className="page practice-page no-footer">
    <div className="practice-layout">

      {/* LEFT: RECORDER (50%) */}
      <div className="practice-left">
        <div className="practice-panel">

          <h2>Practice Interview</h2>

          <div className="progress-container">
            <div className="progress-info">
              Question {index + 1} of {questions.length}
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((index + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h3>Question {index + 1}</h3>
          <p>{questions[index]}</p>

          <Recorder onFinish={onFinish} />
        </div>
      </div>

      {/* RIGHT: TIPS (50%) */}
      <div className="practice-right">
        <div className="tips-panel">
          <h3>Interview Tips</h3>

          <ul>
            <li>🎯 Look directly into the camera</li>
            <li>🗣 Speak clearly and confidently</li>
            <li>📌 Structure answers (Intro → Point → Example)</li>
            <li>😊 Maintain calm body language</li>
            <li>⏱ Avoid long pauses</li>
          </ul>

          <div className="tip-quote">
            “Preparation builds confidence.”
          </div>
        </div>
      </div>

    </div>
  </div>
);
}
