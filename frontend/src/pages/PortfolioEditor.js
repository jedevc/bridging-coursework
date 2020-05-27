import React, { useEffect, useState } from 'react';

import ContentContainer from '../components/ContentContainer';
import Auth from '../components/Auth';
import GenericEditor from '../components/GenericEditor';
import Error from '../components/Error';

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
        <SectionEditor type="cv/education" name="Education" spec={educationSpec} />
        <SectionEditor type="cv/projects" name="Projects" spec={projectSpec} />
        <SectionEditor type="cv/work" name="Work" spec={workSpec} />
        <SectionEditor type="cv/volunteer" name="Volunteering" spec={workSpec} />
        <SectionEditor type="cv/awards" name="Awards" spec={awardsSpec} />
      </ContentContainer>
    </section>
  );
}

function SectionEditor(props) {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let doRead = async () => {
      try {
        setContents(await lister(props.type));
      } catch (e) {
        let bodyMessage = await e.response.json();
        setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
      }
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
        try {
          if (item.id) {
            let result = updater(props.type, item.id, item);
            handleChange(await result);
          } else {
            let result = creator(props.type, item);
            handleChange(await result);
          }
          setError(null);
        } catch (e) {
          let bodyMessage = await e.response.json();
          setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
        }
      }
      doUpdate();
    }

    const handleDelete = () => {
      let doDelete = async () => {
        try {
          await deleter(props.type, item.id);
          setError(null);
        } catch (e) {
          let bodyMessage = await e.response.json();
          setError(`${e.response.status} ${e.response.statusText} ${JSON.stringify(bodyMessage)}`);
          return;
        }

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
    
    // NOTE: we don't use the item.id as a key here, as there may be uncompleted
    // items at the end without an id
    return (
      <div key={index} className="box">
        <GenericEditor spec={props.spec} content={item} onChange={handleChange} onSubmit={handleUpdate} onDelete={handleDelete} />
        <br />
        <Error error={error} />
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
