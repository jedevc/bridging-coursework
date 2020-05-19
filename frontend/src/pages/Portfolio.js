import React, { useEffect } from 'react';

import ContentContainer from '../components/ContentContainer';

const education = [
  {
    qualification: "Computer Science BSc",
    icon: "fa fa-university",
    location: "University of Birmingham",
    start: "2018",
    end: "2021",
    notes: [
      "On track for 1st class degree",
      "Awarded first year undergraduate prizes for highest combined weighted average",
    ],
  },
  {
    qualification: "A levels",
    icon: "fa fa-school",
    location: "KISC",
    start: "2017",
    end: "2018",
    notes: [
      "A*A*A in Computer Science, Maths and English Language",
    ],
  },
  {
    qualification: "IGCSEs",
    icon: "fa fa-school",
    location: "KISC",
    start: "2016",
    end: "2017",
    notes: [
      "10 GCSEs, 9 A*s",
    ],
  },
];

const projects = [
  {
    name: "AppArea",
    icon: "fa fa-filter",
    link: "https://apparea.dev",
    notes: [
      "Lightweight open-source port forwarding helper using SSH tunnels.",
      "Written as a development utility, and used to share websites on localhost with the world.",
    ],
  },
];

const work = [
  {
    name: "Progressive Accessibility Solutions",
    icon: "fa fa-universal-access",
    role: "Front-end engineer",
    start: "Nov 2019",
    end: "Present",
    notes: [
      "Designed and created a new website from scratch to represent the face of the company.",
      "Designed for adaptive screen sizes, including mobile, and ensured an accessibility friendly layout.",
      "Setup Headless CMS and engineered CI/CD pipelines to facilitate automation.",
    ],
  },
];

const volunteering = [
  {
    name: "Hack the Midlands",
    icon: "fa fa-network-wired",
    role: "Organizer",
    start: "Jun 2019",
    end: "Present",
    notes: [
      "Helped plan and organize a hackathon of over 250 attendees.",
      "Built and deployed a number of web services to enhance attendee experience.",
      "Designed and ran a CTF, accessible to attendees of all ages and skill levels.",
    ],
  },
];

const awards = [
  {
    name: "Test prize",
    icon: "fa fa-award",
    giver: "University of Birmingham",
    date: "Dec 2019",
    notes: ["A single note"],
  },
];

export default function Portfolio() {
  useEffect(() => {
    document.title = "jedevc | Portfolio";
  }, []);

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

          {item.notes.map(note => <li>{note}</li>)}
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

          {item.notes.map(note => <li>{note}</li>)}
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

          {item.notes.map(note => <li>{note}</li>)}
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

          {item.notes.map(note => <li>{note}</li>)}
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

          {item.notes.map(note => <li>{note}</li>)}
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

      <div class="content">
        {props.children}
      </div>
    </div>
  );
}
