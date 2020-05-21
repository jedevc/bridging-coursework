import React, { useState } from 'react';

import Auth from "./Auth";

export default function Footer(props) {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") != null);

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear('token');
  }
  
  let userControl;
  if (loggedIn) {
    userControl = (
      <a onClick={logout}>Logout</a>
    )
  } else {
    userControl = (
      <a onClick={login}>Login</a>
    )
  }

  return (
    <>
      <footer className="footer">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column"></div>
              <div className="column has-text-right">
                {userControl}
              </div>
            </div>
          </div>
        </section>
      </footer>
      {loggedIn ? <Auth /> : null}
    </>
  );
}
