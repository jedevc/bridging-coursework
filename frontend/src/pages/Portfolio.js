import React, { useEffect, useState } from 'react';

import ContentContainer from '../components/ContentContainer';

export default function Portfolio() {
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [work, setWork] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    document.title = "jedevc | CV";

    async function fetchEducation() {
      let resp = await fetch(`/api/cv/education`);
      if (resp.ok) {
        let json = await resp.json();
        setEducation(json);
      }
    }
    async function fetchProjects() {
      let resp = await fetch(`/api/cv/projects`);
      if (resp.ok) {
        let json = await resp.json();
        setProjects(json);
      }
    }
    async function fetchWork() {
      let resp = await fetch(`/api/cv/work`);
      if (resp.ok) {
        let json = await resp.json();
        setWork(json);
      }
    }
    async function fetchVolunteering() {
      let resp = await fetch(`/api/cv/volunteer`);
      if (resp.ok) {
        let json = await resp.json();
        setVolunteering(json);
      }
    }
    async function fetchAwards() {
      let resp = await fetch(`/api/cv/awards`);
      if (resp.ok) {
        let json = await resp.json();
        setAwards(json);
      }
    }
    fetchEducation();
    fetchProjects();
    fetchWork();
    fetchVolunteering();
    fetchAwards();
  }, [])

  let educationView = education.map((item) => {
    return (
      <Item name={item.qualification} icon={item.icon}>
        <ul>
          <li>
            {item.location}{" "}
            <strong>
              ({item.start} - {item.end})
            </strong>
          </li>

          {item.notes.split(/[\r\n]+/).map(note => <li>{note}</li>)}
        </ul>
      </Item>
    );
  });

  let projectsView = projects.map((item) => {
    return (
      <Item name={item.name} icon={item.icon}>
        <ul>
          <li>
            <a href={item.link}>{item.link}</a>
          </li>

          {item.notes.split(/[\r\n]+/).map(note => <li>{note}</li>)}
        </ul>
      </Item>
    );
  });

  let workView = work.map((item) => {
    return (
      <Item name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.role} <strong>({item.start} - {item.end})</strong>
          </li>

          {item.notes.split(/[\r\n]+/).map(note => <li>{note}</li>)}
        </ul>
      </Item>
    );
  });

  let volunteeringView = volunteering.map((item) => {
    return (
      <Item name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.role} <strong>({item.start} - {item.end})</strong>
          </li>

          {item.notes.split(/[\r\n]+/).map(note => <li>{note}</li>)}
        </ul>
      </Item>
    );
  });
  
  let awardsView = awards.map((item) => {
    return (
      <Item name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.giver} <strong>({item.date})</strong>
          </li>

          {item.notes.split(/[\r\n]+/).map(note => <li>{note}</li>)}
        </ul>
      </Item>
    );
  });
  
  return (
    <section className="section">
      <ContentContainer>
        <div className="box">
          <h1 className="title">Justin Chadwell</h1>
          <h2 className="subtitle">Smethwick, West Midlands UK</h2>

          <p>
            Computer Science Student working on awesome projects 🎉
          </p>
        </div>

        <div className="box">
          <h2 className="title">Education</h2>
          {educationView}
        </div>

        <div className="box">
          <h2 className="title">Projects</h2>
          {projectsView}
        </div>

        <div className="box">
          <h2 className="title">Work</h2>
          {workView}
        </div>
        <div className="box">
          <h2 className="title">Volunteering</h2>
          {volunteeringView}
        </div>
        <div className="box">
          <h2 className="title">Awards</h2>
          {awardsView}
        </div>
      </ContentContainer>
    </section>
  );
}

function Item(props) {
  return (
    <div style={{marginBottom: "1.2rem"}}>
      <div className="button">
        <span className="icon">
          <i className={props.icon}></i>
        </span>
        <span>{props.name}</span>
      </div>

      <div className="content">
        {props.children}
      </div>
    </div>
  );
}
