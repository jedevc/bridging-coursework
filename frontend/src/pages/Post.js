import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { PostHeader } from "../components/Post";
import ContentContainer from '../components/ContentContainer';

export default function Post() {
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    document.title = "jedevc";

    async function fetchData() {
      let resp = await fetch(`/api/posts/${id}`);
      if (resp.ok) {
        let json = await resp.json();
        setPost(json);
        document.title = "jedevc | " + json["title"];
      }
    }
    fetchData();
  }, [])

  if (Object.keys(post).length == 0) {
    return <></>;
  }

  return (
    <section className="section">
      <ContentContainer>
        <Link to={`/blog/${id}/edit`} className="has-text-black">
          <span className="icon is-medium is-pulled-right">
            <i className="fa fa-lg fa-edit" aria-hidden="true"></i>
          </span>
        </Link>

        <PostHeader title={post.title} date={post.published_date} />

        <div className="content">
          <ReactMarkdown source={post.content} />
        </div>
      </ContentContainer>
    </section>
  );
}