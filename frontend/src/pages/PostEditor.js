import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';
import { updater, deleter, reader } from '../utils/api';

export default function PostEditor() {
  const [post, setPost] = useState({});
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let json = await reader("posts", id);
      setPost(json);
    }
    fetchData();
  }, []);

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
    async function doSubmit() {
      let result = await updater("posts", id, post);
      history.push(`/blog/${id}`);
    }
    doSubmit();
  }

  const handleCancel = () => {
    history.push(`/blog/${id}`);
  }

  const handleDelete = () => {
    async function doDelete() {
      await deleter("posts", id);
      history.push(`/blog/`);
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