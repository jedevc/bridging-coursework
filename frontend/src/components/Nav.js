import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Nav() {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-item">
          </span>
          <span className="navbar-burger" onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={`navbar-menu ${active ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/blog" className="navbar-item">Blog</Link>
            <Link to="/cv" className="navbar-item">CV</Link>
            <span className="navbar-item">
              <a className="button is-dark" href="https://github.com/jedevc">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>GitHub</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
