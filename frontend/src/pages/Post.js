import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { PostHeader } from "../components/Post";

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
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile">
            <PostHeader title={post.title} date={post.published_date} />

            <div className="content">
              <ReactMarkdown source={post.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}