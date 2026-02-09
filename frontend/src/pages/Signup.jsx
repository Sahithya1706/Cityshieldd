import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-city.png";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    // 🔹 Dummy signup (backend baad me add hoga)
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image">
          <img src={heroImg} alt="City" />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          <h2>Create your account</h2>
          <p>Join CityShield and help make cities safer</p>

          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" onClick={handleSignup}>
            Sign Up
          </button>

          <p className="auth-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
