import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    login(res.data.user, res.data.token);
    navigate("/dashboard");
  };

  
   return (
  <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#D4DBE9" }}>
    <div className="w-full max-w-md">
      <div className="card">
        <h1 className="text-3xl mb-2" style={{ color: "#142C52" }}>
          Welcome back
        </h1>
        <p className="mb-6" style={{ color: "#5B74A3" }}>
          Sign in to continue your learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input-field"
              placeholder="you@example.com"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="helper-text">
          Don’t have an account?{" "}
          <span className="font-semibold" style={{ color: "#142C52" }}>
            Register
          </span>
        </p>
      </div>
    </div>
  </div>
);


};

export default Login;
