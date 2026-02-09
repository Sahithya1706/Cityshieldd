import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-city.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-left">
        <h1>
          Interactive <br />
          City Safety Map
        </h1>

        <p>
          Explore real-time safety alerts, track incidents across the city,
          and help authorities respond faster. CityShield makes urban safety
          smarter and more transparent.
        </p>

        <button
          className="cta-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hero-right">
        <img src={heroImg} alt="CityShield city illustration" />
      </div>
    </section>
  );
};

export default Hero;
