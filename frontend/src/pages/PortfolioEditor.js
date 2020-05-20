import React, { useEffect, useState } from 'react';

import ContentContainer from '../components/ContentContainer';
import Auth from '../components/Auth';

import { lister, creator, updater, deleter } from '../utils/api';

export default function Portfolio() {
  const educationSpec = [
    { name: "Qualification", key: "qualification" },
    { name: "Location", key: "location" },
    { name: "Icon", key: "icon", special: "icon" },
    { name: "Start", key: "start" },
    { name: "End", key: "end" },
    { name: "Notes", key: "notes", special: "textarea" },
  ]
  const workSpec = [
    { name: "Name", key: "name" },
    { name: "Role", key: "role" },
    { name: "Icon", key: "icon", special: "icon" },
    { name: "Start", key: "start" },
    { name: "End", key: "end" },
    { name: "Notes", key: "notes", special: "textarea" },
  ]
  const projectSpec = [
    { name: "Name", key: "name" },
    { name: "Link", key: "link" },
    { name: "Icon", key: "icon", special: "icon" },
    { name: "Notes", key: "notes", special: "textarea" },
  ]
  const awardsSpec = [
    { name: "Name", key: "name" },
    { name: "Giver", key: "giver" },
    { name: "Icon", key: "icon", special: "icon" },
    { name: "Date", key: "date" },
    { name: "Notes", key: "notes", special: "textarea" },
  ]

  return (
    <section className="section">
      <ContentContainer>
        <Auth />
        <GodEditor type="cv/education" name="Education" spec={educationSpec} />
        <GodEditor type="cv/work" name="Work" spec={workSpec} />
        <GodEditor type="cv/volunteer" name="Volunteering" spec={workSpec} />
        <GodEditor type="cv/projects" name="Projects" spec={projectSpec} />
        <GodEditor type="cv/awards" name="Awards" spec={awardsSpec} />
      </ContentContainer>
    </section>
  );
}

function GodEditor(props) {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    let doRead = async () => {
      setContents(await lister(props.type));
    }
    doRead();
  }, [props.type]);

  let contentView = contents.map((item, index) => {
    const handleChange = (newContent) => {
      setContents(contents.map((otherItem, otherIndex) => {
        if (index == otherIndex) {
          return newContent;
        } else {
          return otherItem;
        }
      }));
    }

    const handleUpdate = () => {
      let doUpdate = async () => {
        let result;
        if (item.id) {
          result = updater(props.type, item.id, item);
        } else {
          result = creator(props.type, item);
        }
        
        handleChange(await result);
      }
      doUpdate();
    }

    const handleDelete = () => {
      let doDelete = async () => {
        await deleter(props.type, item.id);
        setContents(contents.filter((otherItem, otherIndex) => {
          if (index == otherIndex) {
            return false;
          } else {
            return true;
          }
        }));
      }
      doDelete();
    }
    
    return (
      <div className="box">
        <GenericEditor spec={props.spec} content={item} onChange={handleChange} onSubmit={handleUpdate} onDelete={handleDelete} />
      </div>
    );
  });

  const handleCreate = () => {
    let newObj = {};
    for (let specItem of props.spec) {
      newObj[specItem.key] = "";
    }
    setContents([...contents, newObj]);
  }

  return (
    <div className="box">
      <h1 className="title">{props.name}</h1>

      {contentView}

      <button className="button is-primary" onClick={handleCreate}>
        <span className="icon">
          <i className="fa fa-plus-circle"></i>
        </span>
        <span>New {props.name}</span>
      </button>
    </div>
  );
}

function GenericEditor(props) {
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
