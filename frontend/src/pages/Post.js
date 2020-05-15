import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState({});
  let { id } = useParams();

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

  return (
    <div className="container">
      <h1 className="title">{post.title}</h1>

      <div className="content">
        {post.text}
      </div>
    </div>
  );
}