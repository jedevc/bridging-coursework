import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';

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
  }, []);

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
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

  const handleCancel = () => {
    history.push(`/blog/${id}`);
  }

  const handleDelete = () => {
    async function del() {
      let token = localStorage.getItem('token');
      let resp = await fetch(`/api/posts/${id}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      
      if (resp.ok) {
        history.push(`/blog/`);
      }
    }
    del();
  }

  if (Object.keys(post).length == 0) {
    return <></>;
  }

  return (
    <>
      <Auth />
      <section className="section">
        <ContentContainer>
          <PostEditorComponent post={post} onChange={handleChange} onCancel={handleCancel} onSubmit={handleSubmit} />
          <br />
          <div className="message is-danger">
            <div className="message-body">
              <p className="subtitle">Danger zone</p>
              <p>Warning, these actions cannot be reversed.</p>
              <br />
              <button className="button is-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
}