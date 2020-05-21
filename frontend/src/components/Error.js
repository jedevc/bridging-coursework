import React from 'react';

export default function Error(props) {
  let errors = [];
  if (props.errors) {
    errors.push(...props.errors);
  }
  if (props.error) {
    errors.push(props.error);
  }

  return errors.map((error, index) => (
    <div className="message is-danger" key={index}>
      <div className="message-body">
        {error}
      </div>
    </div>
  ));
}
