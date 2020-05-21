import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';
import { creator } from '../utils/api';

export default function PostEditor() {
  const [post, setPost] = useState({
    title: "",
    published_date: new Date().toISOString(),
    summary: "",
    content: "",
  });
  let history = useHistory();

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
    async function doSubmit() {
      let json = await creator("posts", post);
      history.push(`/blog/${json.id}`);
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
        </ContentContainer>
      </section>
    </>
  );
}