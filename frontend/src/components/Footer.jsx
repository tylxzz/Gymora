import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-column footer-brand">
          <div className="footer-logo">GYMORA</div>
          <p className="footer-brand-text">
            Your complete fitness management solution.
          </p>

          <div className="footer-social">
            <FiFacebook />
            <FiInstagram />
            <FiTwitter />
            <FiLinkedin />
          </div>
        </div>

        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>Our Story</li>
            <li>Team</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>support@gymora.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Fitness St, NY</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Gymora. All rights reserved.
      </div>
    </footer>
  );
}
