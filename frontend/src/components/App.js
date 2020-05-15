import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <Nav />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Hero title="Justin Chadwell" subtitle="Bridging Coursework" />
      <section className="section">
        <div className="container">
          <h1 className="title">Title</h1>
          <p>Just some information</p>
        </div>
      </section>
    </>
  )
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
            <Link to="/" className="navbar-item is-active">Home</Link>
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
