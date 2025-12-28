import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

export default function Recorder({ onFinish }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const timerRef = useRef(null);
  const secondsRef = useRef(0);

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // ⏳ Countdown state
  const [countdown, setCountdown] = useState(null);

  /* ================= CAMERA INIT ================= */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        recorderRef.current = new MediaRecorder(stream);

        recorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        recorderRef.current.onstop = () => {
          clearInterval(timerRef.current);

          const blob = new Blob(chunksRef.current, {
            type: "video/webm",
          });

          const videoURL = URL.createObjectURL(blob);

          onFinish({ videoURL, duration: secondsRef.current });

          chunksRef.current = [];
          secondsRef.current = 0;
          setSeconds(0);
        };
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onFinish]);

  /* ================= TIMER ================= */
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  /* ================= START WITH COUNTDOWN ================= */
  const startWithCountdown = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        startRecording();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const startRecording = () => {
    chunksRef.current = [];
    secondsRef.current = 0;
    setSeconds(0);

    recorderRef.current.start();
    startTimer();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stop();
    stopTimer();
    setRecording(false);
  };

  return (
    <div className="recorder-container">
      {/* 🎥 VIDEO */}
      <div className="video-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="recorder-video"
        />

        {/* 🔴 REC INDICATOR */}
        {recording && (
          <div className="rec-indicator">
            <span className="dot" />
            REC
          </div>
        )}

        {/* ⏳ COUNTDOWN */}
        {countdown && (
          <div className="countdown-overlay">
            {countdown}
          </div>
        )}
      </div>

      {/* ⏱ TIMER */}
      <Timer seconds={seconds} />

      {/* 🎛 BUTTON */}
      {!recording ? (
        <button
          className="primary-btn"
          onClick={startWithCountdown}
          disabled={countdown !== null}
        >
          Start Answer
        </button>
      ) : (
        <button className="primary-btn" onClick={stopRecording}>
          Stop Answer
        </button>
      )}
    </div>
  );
}
