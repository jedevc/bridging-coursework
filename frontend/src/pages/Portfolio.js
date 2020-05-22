import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { lister } from "../utils/api";

import ContentContainer from '../components/ContentContainer';
import useLocalStorage from "../hooks/useLocalStorage";

export default function Portfolio() {
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [work, setWork] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [awards, setAwards] = useState([]);
  const [token] = useLocalStorage("token", "");

  useEffect(() => {
    document.title = "jedevc | CV";

    const doFetch = async () => {
      setEducation(await lister("cv/education"));
      setProjects(await lister("cv/projects"));
      setWork(await lister("cv/work"));
      setVolunteering(await lister("cv/volunteer"));
      setAwards(await lister("cv/awards"));
    }
    doFetch();
  }, [])

  let educationView = education.map((item) => {
    return (
      <Item key={item.id} name={item.qualification} icon={item.icon}>
        <ul>
          <li>
            {item.location}{" "}
            <strong>
              ({item.start} - {item.end})
            </strong>
          </li>

          <Notes content={item.notes} />
        </ul>
      </Item>
    );
  });

  let projectsView = projects.map((item) => {
    return (
      <Item key={item.id} name={item.name} icon={item.icon}>
        <ul>
          <li>
            <a href={item.link}>{item.link}</a>
          </li>

          <Notes content={item.notes} />
        </ul>
      </Item>
    );
  });

  let workView = work.map((item) => {
    return (
      <Item key={item.id} name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.role} <strong>({item.start} - {item.end})</strong>
          </li>

          <Notes content={item.notes} />
        </ul>
      </Item>
    );
  });

  let volunteeringView = volunteering.map((item) => {
    return (
      <Item key={item.id} name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.role} <strong>({item.start} - {item.end})</strong>
          </li>

          <Notes content={item.notes} />
        </ul>
      </Item>
    );
  });
  
  let awardsView = awards.map((item) => {
    return (
      <Item key={item.id} name={item.name} icon={item.icon}>
        <ul>
          <li>
            {item.giver} <strong>({item.date})</strong>
          </li>

          <Notes content={item.notes} />
        </ul>
      </Item>
    );
  });
  
  return (
    <section className="section">
      <ContentContainer>
        <div className="box">
          {token && token.length > 0 ? <PortfolioEditLink /> : null}

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

function Notes(props) {
  let items = props.content.split(/[\r\n]+/);
  let notes = items.map((item, index) => (
    <li key={index}>
      {item}
    </li>
  ));
  return notes;
}

function PortfolioEditLink() {
  return (
    <Link to="/cv/edit" className="has-text-black is-pulled-right">
      <span className="icon is-medium">
        <i className="fa fa-lg fa-edit" aria-hidden="true"></i>
      </span>
    </Link>
  );
}