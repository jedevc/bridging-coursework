import React from 'react';
import Nav from "../components/Nav";

export default function Home() {
  return (
    <>
      <Hero title="Justin Chadwell" subtitle="Bridging Coursework" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title is-family-monospace">whoami</h1>
              <p>
                Hey there, I'm Justin! I also go as @jedevc in online places, a
                random collection of letters which you can pronounce however you
                like, I don't really mind.
              </p>
              <br />
              <p>
                I'm a university student, developer, occasional web designer,
                and security enthusiast!
              </p>
              <br />
              <p>
                I'm a regular member of <a href="https://afnom.net">AFNOM</a>,
                and I'm at most <a href="https://cssbham.com">CSS</a> events
                as well.
              </p>
            </div>
            <div className="column">
              <Socials email="jedevc@gmail.com"
                       twitter="jedevc"
                       linkedin="jedevc"
                       github="jedevc" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Socials(props) {
  let socials = [];
  if (props.twitter) {
    socials.push(
      <a className="panel-block" href={`https://twitter.com/${props.twitter}`}>
        <span className="panel-icon">
          <i className="fab fa-twitter" aria-hidden="true"></i>
        </span>
        Twitter
      </a>
    );
  }
  if (props.github) {
    socials.push(
      <a className="panel-block" href={`https://github.com/${props.github}`}>
        <span className="panel-icon">
          <i className="fab fa-github" aria-hidden="true"></i>
        </span>
        GitHub
      </a>
    );
  }
  if (props.linkedin) {
    socials.push(
      <a className="panel-block" href={`https://linkedin.com/in/${props.linkedin}`}>
        <span className="panel-icon">
          <i className="fab fa-linkedin" aria-hidden="true"></i>
        </span>
        Linkedin
      </a>
    );
  }
  if (props.email) {
    socials.push(
      <a className="panel-block" href={`mailto:${props.email}`}>
        <span className="panel-icon">
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </span>
        Email
      </a>
    );
  }

  return (
    <div className="panel">
      <p className="panel-heading">Socials</p>
      {socials}
    </div>
  );
}

function Hero(props) {
  return (
    <section className="hero is-primary is-medium">
      <div className="hero-head">
        <Nav />
      </div>

      <div className="hero-body">
        <div className="container">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">{props.subtitle}</h2>
        </div>
      </div>
    </section>
  );
}
