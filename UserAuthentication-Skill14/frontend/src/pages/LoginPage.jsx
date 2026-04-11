import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { saveUserSession } from "../storage";

export default function LoginPage({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: location.state?.username ?? "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authData = await loginUser(formData);
      saveUserSession(authData, rememberMe ? "local" : "session");
      onLogin();
      navigate("/home", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="eyebrow">Welcome Back</p>
        <h1>Login to continue</h1>
        <p className="auth-copy">
          Use your registered credentials to access the Home and Profile pages.
        </p>

        {location.state?.registered ? (
          <p className="message success">
            Registration completed. You can now sign in with your new account.
          </p>
        ) : null}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Username</span>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>

          <label className="input-group">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Keep me signed in with localStorage</span>
          </label>

          {error ? <p className="message error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

