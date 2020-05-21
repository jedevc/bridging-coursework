import React, { useState, useEffect } from 'react';
import Error from "./Error";
import useLocalStorage from '../hooks/useLocalStorage';

export default function Auth() {
  const [inputs, setInputs] = useState({username: "", password: ""});
  const [token, setToken] = useLocalStorage('token', '');
  const [errors, setErrors] = useState([]);
 
  if (token) {
    // already authenticated
    return <></>
  }

  const handleInputs = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    async function submit() {
      let resp = await fetch("/api-token/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      let json = await resp.json();
      if (json["token"]) {
        setToken(json["token"]);
      } else if (json["non_field_errors"]) {
        setErrors(json["non_field_errors"]);
      }
    }
    submit();
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <form className="box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                name="username"
                className="input"
                type="text"
                value={inputs.username}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                name="password"
                className="input"
                type="password"
                value={inputs.password}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>

          <Error errors={errors} />
        </form>
      </div>
    </div>
  );
}
