import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Taskify. All rights reserved.</p>
        <p>
          Contact us: <a href="mailto:support@taskify.com">support@taskify.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; // Ensure default export is used here
