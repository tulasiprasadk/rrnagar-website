import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div style={{ padding: "18px 16px", textAlign: "center" }}>
        <nav aria-label="Footer links" style={{ marginBottom: 10 }}>
          <Link to="/partner" style={linkStyle}>
            Partner Us
          </Link>
          <span style={sep}>•</span>
          <Link to="/blog" style={linkStyle}>
            Blog
          </Link>
          <span style={sep}>•</span>
          <Link to="/privacy" style={linkStyle}>
            Privacy Notice
          </Link>
          <span style={sep}>•</span>
          <Link to="/terms" style={linkStyle}>
            Conditions of Use
          </Link>
          <span style={sep}>•</span>
          <Link to="/supplier-login" style={linkStyle}>
            Supplier
          </Link>
        </nav>

        <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
          (C) 2025 RR Nagar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Inline styles kept here so the file is self-contained and avoids external classnames
const linkStyle = {
  margin: "0 8px",
  color: "inherit",
  textDecoration: "none",
  fontWeight: 500,
};

const sep = {
  margin: "0 4px",
  color: "#999",
};