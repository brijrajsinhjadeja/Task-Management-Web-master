import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Taskify. All rights reserved.</p>
        <p>
          Contact us: <a href="mailto:support@taskify.com">support@taskify.com</a><br/>
        </p>
        <h3>          Developed By : Brijrajsinh Jadeja <a href="https://3waytech.co/" >@ 3way Technology</a>
        </h3>
      </div>
    </footer>
  );
};

export default Footer; // Ensure default export is used here
