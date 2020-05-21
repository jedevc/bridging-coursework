import React, { useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import Auth from "./Auth";

export default function Footer(props) {
  const [token, setToken] = useLocalStorage("token", "");
  const [loggingIn, setLoggingIn] = useState(false);

  const login = () => {
    setLoggingIn(true);
  }
  
  const logout = () => {
    setLoggingIn(false);
    setToken("");
  }

  let userControl;
  if (token && token.length > 0) {
    userControl = <a onClick={logout}>Logout</a>;
  } else {
    userControl = <a onClick={login}>Login</a>;
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
      {loggingIn ? <Auth /> : null}
    </>
  );
}
