import React from "react";
import NavbarSegmented from "../Navbar/Navbar";
import "./Base.css";

const Base = ({ children }) => {
  return (
    <div className="container">
      <NavbarSegmented />
      <div className="content">{children}</div>
    </div>
  );
};

export default Base;
