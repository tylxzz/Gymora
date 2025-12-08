import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">GYMORA</div>
          <h1>Welcome Back</h1>
          <p>Log in to manage your gym dashboard and classes.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" placeholder="••••••••" />
          </div>

          <div className="auth-extra-row">
            <button type="button" className="link-small">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-auth-primary">
            Log In
          </button>
        </form>

        <div className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register" className="link-small">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
