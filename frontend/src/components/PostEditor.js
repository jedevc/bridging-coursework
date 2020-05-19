import React from 'react';

export default function PostEditor(props) {
  const handleInputs = (event) => {
    const newPost = {...props.post, [event.target.name]: event.target.value};
    props.onChange(newPost);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  }

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
  }

  if (Object.keys(props.post).length == 0) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            required
            value={props.post.title}
            onChange={handleInputs}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="date" className="label">
          Publish date
        </label>
        <div className="control">
          <input
            className="input"
            type="datetime-local"
            name="published_date"
            required
            value={props.post.published_date}
            onChange={handleInputs}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="summary" className="label">
          Summary
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="summary"
            required
            value={props.post.summary}
            onChange={handleInputs}
          ></textarea>
        </div>
      </div>

      <div className="field">
        <label htmlFor="content" className="label">
          Content
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="content"
            required
            value={props.post.content}
            onChange={handleInputs}
          ></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}