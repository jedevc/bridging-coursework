import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';
import Error from '../components/Error';
import { updater, deleter, reader } from '../utils/api';

export default function PostEditor() {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        let json = await reader("posts", id);
        setPost(json);
        setError(null);
      } catch (e) {
        let bodyMessage = await e.response.json();
        setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
      }
    }
    fetchData();
  }, []);

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
    async function doSubmit() {
      try {
        let result = await updater("posts", id, post);
        history.push(`/blog/${id}`);
        setError(null);
      } catch (e) {
        let bodyMessage = await e.response.json();
        setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
      }
    }
    doSubmit();
  }

  const handleCancel = () => {
    history.push(`/blog/${id}`);
  }

  const handleDelete = () => {
    async function doDelete() {
      try {
        await deleter("posts", id);
        history.push(`/blog/`);
        setError(null);
      } catch (e) {
        let bodyMessage = await e.response.json();
        setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
      }
    }
    doDelete();
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
          <div className="message is-warning">
            <div className="message-body">
              <p className="subtitle">Danger zone</p>
              <p>Warning, these actions cannot be reversed.</p>
              <br />
              <button className="button is-warning" onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <Error error={error} />
        </ContentContainer>
      </section>
    </>
  );
}