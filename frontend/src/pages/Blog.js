import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { PostHeader } from "../components/Post";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let resp = await fetch("/api/posts");
      if (resp.ok) {
        let json = await resp.json();
        setPosts(json);
      }
    }
    fetchData();
  }, [])

  const items = posts.map((post) =>
    <Link to={`/blog/${post.id}`} key={post.id}>
      <PostPreview post={post} />
    </Link>
  );

  return (
    <section className="section">
      <div className="container">
        {items}

        <Link to="/blog/new" className="button is-primary is-pulled-right">
          <span className="icon">
            <i className="fa fa-plus-circle"></i>
          </span>
          <span>New</span>
        </Link>
      </div>
    </section>
  )
}

function PostPreview(props) {
  return (
    <div className="box" style={{marginBottom: "1rem"}}>
      <PostHeader title={props.post.title} date={props.post.published_date} />

      <p>{props.post.summary}</p>
    </div>
  )
}
