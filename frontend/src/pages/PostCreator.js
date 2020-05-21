import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';
import Error from '../components/Error';
import { creator } from '../utils/api';

export default function PostEditor() {
  const [post, setPost] = useState({
    title: "",
    published_date: new Date().toISOString(),
    summary: "",
    content: "",
  });
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
    async function doSubmit() {
      try {
        let json = await creator("posts", post);
        history.push(`/blog/${json.id}`);
        setError(null);
      } catch (e) {
        let bodyMessage = await e.response.json();
        setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
      }
    }
    doSubmit();
  }

  const handleCancel = () => {
    history.push("/blog/");
  }

  return (
    <>
      <Auth />

      <section className="section">
        <ContentContainer>
          <PostEditorComponent post={post} onChange={handleChange} onCancel={handleCancel} onSubmit={handleSubmit} />
          <br />
          <Error error={error} />
        </ContentContainer>
      </section>
    </>
  );
}