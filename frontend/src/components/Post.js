import React from 'react';
import { formatDate } from "../utils/date";

export function PostHeader(props) {
  return (
    <>
      <h2 className="title" style={{marginBottom: "0.6rem"}}>{props.title}</h2>
      <div className="has-text-grey is-size-7" style={{marginBottom: "1.2rem"}}>
        <time dateTime={props.date}>{formatDate(props.date)}</time>
      </div>
    </>
  )
}