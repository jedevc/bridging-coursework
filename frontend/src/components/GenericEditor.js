import React from 'react';

export default function GenericEditor(props) {
  const handleInputs = (event) => {
    const newContent = {...props.content, [event.target.name]: event.target.value};
    if (props.onChange) {
      props.onChange(newContent);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(props.content);
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();
    if (props.onDelete) {
      props.onDelete(props.content);
    }
  }

  const contents = props.spec.map((item) => {
    let input;
    if (item.special == "textarea") {
      input = (
        <div className="control">
          <textarea className="textarea" name={item.key} required value={props.content[item.key]} onChange={handleInputs}></textarea>
        </div>
      );
    } else {
      input = (
        <div className="control">
        <input
            className="input"
            type="text"
            name={item.key}
            required
            value={props.content[item.key]}
            onChange={handleInputs}
          />
          </div>
      );
    }
    return (
      <div className="field">
        <label htmlFor="title" className="label">
          {item.name}
        </label>
        {input}
      </div>
    );
  });

  let deleteButton;
  if (props.content.id) {
    deleteButton = (
      <div className="field">
        <div className="control">
          <button className="button is-danger" onClick={handleDelete}>
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {contents}

      <div className="level">
        <div className="level-left">
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </div>
        <div className="level-right">{deleteButton}</div>
      </div>
    </form>
  );
}