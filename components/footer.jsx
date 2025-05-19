import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#fff",
        color: "#333",
        borderTop: "1px solid #eaeaea",
        padding: "1.5rem 0",
        textAlign: "center",
        fontSize: "1rem",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
        marginTop: "auto",
      }}
    >
      <span>
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
