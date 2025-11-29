import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rn-footer" role="contentinfo">
      <div className="rn-footer-inner">
        <div className="footer-col footer-about">
          <h3 className="footer-title">RR à²¨à²—à²°</h3>
          <p className="footer-desc">
            New digital experience for RRnagar â€” local services, listings and community.
          </p>
        </div>

        <div className="footer-col footer-links">
          <h4 className="footer-subtitle">Quick links</h4>
          <ul>
            <li>
              <Link to="/privacy">Privacy Notices</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link to="/supplier-login">Supplier Login</Link>
            </li>
            <li>
              <Link to="/partner">Partner Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <h4 className="footer-subtitle">Contact</h4>
          <ul>
            <li>Phone: <a href="tel:+919844007900">+91 9844007900</a></li>
            <li>Email: <a href="mailto:hello@rrnagar.com">hello@rrnagar.com</a></li>
            <li>Address: RR Nagar, Bengaluru</li>
          </ul>
        </div>

        <div className="footer-col footer-social">
          <h4 className="footer-subtitle">Follow</h4>
          <div className="social-row" aria-hidden="true">
            <span className="social-pill">FB</span>
            <span className="social-pill">TW</span>
            <span className="social-pill">IG</span>
          </div>
          <p className="small-note">Made with â™¥ for the community</p>
        </div>
      </div>

      <div className="rn-footer-bottom">
        <div className="rn-footer-bottom-inner">
          <span>Â© {year} RR à²¨à²—à²°. All rights reserved.</span>
          <span className="bottom-links">
            <Link to="/privacy">Privacy Notices</Link>
            <Link to="/terms">Terms of Use</Link>
            <a href="/supplier-login" className="external-link">Supplier Login</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

