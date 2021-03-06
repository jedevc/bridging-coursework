import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { PostHeader } from "../components/Post";
import { lister } from "../utils/api";
import useLocalStorage from '../hooks/useLocalStorage';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [token] = useLocalStorage("token", "");

  useEffect(() => {
    document.title = "jedevc | Blog";
  }, []);

  useEffect(() => {
    async function fetchData() {
      let json = await lister("posts");
      setPosts(json);
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

        {token && token.length > 0 ? <NewPostButton /> : null}
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

function NewPostButton() {
  return (
    <Link to="/blog/new" className="button is-primary is-pulled-right">
      <span className="icon">
        <i className="fa fa-plus-circle"></i>
      </span>
      <span>New</span>
    </Link>
  )
}