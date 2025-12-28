import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectInterview from "./pages/SelectInterview";
import Practice from "./pages/Practice";
import Result from "./pages/Result";
import SurgeCheck from "./pages/SurgeCheck";
import SurgeOptions from "./pages/SurgeOptions";
import Feedback from "./pages/Feedback";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* After Login → SURGE Check */}
      <Route
        path="/surge-check"
        element={
          <ProtectedRoute>
            <SurgeCheck />
          </ProtectedRoute>
        }
      />

      {/* SURGE Interview Options */}
      <Route
        path="/surge-options"
        element={
          <ProtectedRoute>
            <SurgeOptions />
          </ProtectedRoute>
        }
      />

      {/* Normal Interview Flow */}
      <Route
        path="/select"
        element={
          <ProtectedRoute>
            <SelectInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <Practice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
    </>
  );
}
