import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-city1.png";
import { getUser } from "../utils/auth";

const Hero = () => {
  const navigate = useNavigate();
  const user = getUser(); // 🔥 check login

  return (
    <section className="hero full-hero">
      {/* LEFT CONTENT */}
      <div className="hero-left">
        <h1>
          Interactive <br />
          City Safety Map
        </h1>

        <p>
          Explore real-time safety alerts, track incidents across the city, and
          help authorities respond faster. CityShield makes urban safety smarter
          and more transparent.
        </p>

        {/* ✅ SHOW ONLY IF NOT LOGGED IN */}
        {!user && (
          <button
            className="cta-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        )}
      </div>

      {/* RIGHT IMAGE */}
      <div className="hero-right">
        <img
          src={heroImg}
          alt="CityShield city safety illustration"
          draggable="false"
        />
      </div>
    </section>
  );
};

export default Hero;
