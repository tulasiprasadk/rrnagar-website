import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ padding: "8px 12px", color: "#ccc" }}>
      <div style={footerContainer}>
        {/* Left: Contact Info */}
        <div style={leftColumn}>
          <strong>Contact Us:</strong><br />
          📞 <a href="https://wa.me/919844007900" style={contactLink}>98440 07900</a><br />
          ✉️ <a href="mailto:namaste@rrnagar.com" style={contactLink}>namaste@rrnagar.com</a>
        </div>

        {/* Right: Navigation Links */}
        <div style={rightColumn}>
          <nav aria-label="Footer links">
            <Link to="/supplier-login" style={linkStyle}>Supplier</Link>
            <span style={sep}>•</span>
            <Link to="/partner" style={linkStyle}>Partner</Link>
            <span style={sep}>•</span>
            <Link to="/privacy" style={linkStyle}>Privacy</Link>
            <span style={sep}>•</span>
            <Link to="/terms" style={linkStyle}>Terms</Link>
          </nav>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: "#777", textAlign: "center" }}>
        &copy; 2025 RR Nagar. All rights reserved.
      </div>
    </footer>
  );
}

const footerContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
};

const leftColumn = {
  flex: "1",
  minWidth: "220px",
  fontSize: 13,
  color: "#ccc",
};

const rightColumn = {
  flex: "1",
  minWidth: "220px",
  textAlign: "right",
  fontSize: 13,
};

const linkStyle = {
  margin: "0 6px",
  color: "#ccc",
  textDecoration: "none",
  fontWeight: 500,
};

const sep = {
  margin: "0 4px",
  color: "#666",
};

const contactLink = {
  color: "#1e90ff",
  textDecoration: "none",
  fontWeight: 500,
};
