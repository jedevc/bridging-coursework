import React, { useState } from 'react';

function App() {
  return (
    <Hero title="Justin Chadwell" subtitle="Bridging Coursework" />
  );
}

function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-active">Home</a>
            <a className="navbar-item">Blog</a>
            <a className="navbar-item">CV</a>
            <a className="navbar-item">
              <span className="button is-dark">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>GitHub</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero(props) {
  return (
    <section className="hero is-primary is-medium">
      <div className="hero-head">
        <Nav />
      </div>

      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">{props.subtitle}</h2>
        </div>
      </div>
    </section>
  );
}

export default App;
