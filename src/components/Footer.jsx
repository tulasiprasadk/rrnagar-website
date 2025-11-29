import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div style={{ padding: "16px", textAlign: "center" }}>
        <nav>
          <Link to="/partner" style={{ marginRight: 16, color: "inherit", textDecoration: "none" }}>
            Partner Us
          </Link>
          <Link to="/blog" style={{ color: "inherit", textDecoration: "none" }}>
            Blog
          </Link>
        </nav>

        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          (C) 2025 RR Nagar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}