import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";

export default function PostEditor() {
  const [post, setPost] = useState({});
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let resp = await fetch(`/api/posts/${id}`);
      if (resp.ok) {
        let json = await resp.json();
        setPost(json);
      }
    }
    fetchData();
  }, [])

  const handleInputs = (event) => {
    event.persist();
    setPost(post => ({...post, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    async function submit() {
      let token = localStorage.getItem('token');
      let resp = await fetch(`/api/posts/${id}/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(post),
      });
      
      if (resp.ok) {
        history.push(`/blog/${id}`);
      }
    }
    submit();
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/blog/${id}`);
  }

  if (Object.keys(post).length == 0) {
    return <></>;
  }

  return (
    <>
    <Auth />
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="title" className="label">Title</label>
                <div className="control">
                  <input className="input" type="text" name="title" value={post.title} onChange={handleInputs} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="date" className="label">Publish date</label>
                <div className="control">
                  <input className="input" type="datetime-local" name="published_date" value={post.published_date} onChange={handleInputs} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="summary" className="label">Summary</label>
                <div className="control">
                  <textarea className="textarea" name="summary" value={post.summary} onChange={handleInputs}></textarea>
                </div>
              </div>

              <div className="field">
                <label htmlFor="content" className="label">Content</label>
                <div className="control">
                  <textarea className="textarea" name="content" value={post.content} onChange={handleInputs}></textarea>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}