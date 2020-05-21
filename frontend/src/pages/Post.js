import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { PostHeader } from "../components/Post";
import ContentContainer from '../components/ContentContainer';
import { reader } from "../utils/api";

export default function Post() {
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    document.title = "jedevc";

    async function fetchData() {
      let json = await reader("posts", id);
      setPost(json);
      document.title = "jedevc | " + json["title"];
    }
    fetchData();
  }, [])

  if (Object.keys(post).length == 0) {
    return <></>;
  }

  return (
    <section className="section">
      <ContentContainer>
        <Link to={`/blog/${id}/edit`} className="has-text-black is-pulled-right">
          <span className="icon is-medium">
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