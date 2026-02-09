import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-city.png";
import { loginUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy login (frontend only)
    loginUser({
      name: "Sahithya",
      email: "test@cityshield.com",
    });

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image">
          <img src={heroImg} alt="City illustration" />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          <h2>Welcome back</h2>
          <p>Please login to your CityShield account</p>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="auth-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="auth-link">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
