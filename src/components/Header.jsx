import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/rrlogo.png";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="RR Nagar Logo" className="rr-logo" />
        </Link>
        <div className="rr-tagline">RR ನಗರದ ಹೊಸ ಡಿಜಿಟಲ್ ಅನುಭವ</div>
      </div>

      <nav className="header-nav">
        <Link to="/account">My Account</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/help">Help</Link>
      </nav>
    </header>
  );
}
