import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { formatDate } from "../utils/date";

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
      </div>
    </section>
  )
}

function PostPreview(props) {
  return (
    <div className="box">
      <h2 className="title" style={{marginBottom: "0.6rem"}}>{props.post.title}</h2>
      <div className="has-text-grey is-size-7" style={{marginBottom: "1.2rem"}}>
        <time dateTime={props.post.published_date}>{formatDate(props.post.published_date)}</time>
      </div>
      <p>{props.post.summary}</p>
    </div>
  )
}
