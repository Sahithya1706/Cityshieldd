import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/login-illustration.png";
import { loginUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    loginUser({
      name: "Sahithya",
      email: "test@cityshield.com",
    });

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card login-card">

        {/* LEFT IMAGE */}
        <div className="auth-image">
          <img src={loginImg} alt="Login illustration" />
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
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
