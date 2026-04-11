import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const initialForm = {
  fullName: "",
  email: "",
  username: "",
  password: ""
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const registeredUser = await registerUser(formData);
      navigate("/login", {
        replace: true,
        state: {
          username: registeredUser.username,
          registered: true
        }
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="eyebrow">Create Account</p>
        <h1>Register for the app</h1>
        <p className="auth-copy">
          Save your details in the backend database and continue to the login screen.
        </p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Full Name</span>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Priya Sharma"
              required
            />
          </label>

          <label className="input-group">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="priya@example.com"
              required
            />
          </label>

          <label className="input-group">
            <span>Username</span>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="priya123"
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
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />
          </label>

          {error ? <p className="message error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Go to Login</Link>
        </p>
      </div>
    </section>
  );
}

