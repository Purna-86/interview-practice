import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
export default function Home() {
  const navigate = useNavigate();


  return (
    <>
      <Navbar/>
        <Hero />
      
      
      <div className="center">
      </div>

      <Footer />
    </>
  );
}
