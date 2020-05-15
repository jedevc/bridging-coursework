import React from 'react';
import Nav from "../components/Nav";

export default function Home() {
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
