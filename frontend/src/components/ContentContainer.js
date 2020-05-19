import React from "react";

export default function ContentContainer(props) {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile">
          {props.children}
        </div>
      </div>
    </div>
  );
}
