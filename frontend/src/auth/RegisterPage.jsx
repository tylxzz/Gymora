import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-card auth-card-large">
        <div className="auth-header">
          <div className="auth-logo">GYMORA</div>
          <h1>Create Account</h1>
          <p>Join Gymora and start your fitness journey</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="reg-name">Full Name</label>
            <input id="reg-name" type="text" placeholder="John Smith" />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" placeholder="••••••••" />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password2">Confirm Password</label>
            <input id="reg-password2" type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-auth-primary">
            Create Account
          </button>
        </form>

        <div className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="link-small">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
