import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Auth from "../components/Auth";
import PostEditorComponent from '../components/PostEditor';
import ContentContainer from '../components/ContentContainer';

export default function PostEditor() {
  const [post, setPost] = useState({
    title: "",
    published_date: new Date(),
    summary: "",
    content: "",
  });
  let history = useHistory();

  const handleChange = (newPost) => {
    setPost(newPost);
  }

  const handleSubmit = () => {
    async function submit() {
      let token = localStorage.getItem('token');
      let resp = await fetch(`/api/posts/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(post),
      });
      
      const json = await resp.json();
      if (resp.ok) {
        history.push(`/blog/${json.id}`);
      } else {
        console.log(json);
      }
    }
    submit();
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