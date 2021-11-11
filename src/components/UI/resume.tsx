import { DateTime, DateTimeFormatOptions } from "luxon";
import React from "react";

type Position = {
  title: string;
  dates: DateRange;
};

type DateRange = { from: DateTime; to: DateTime };

type JobProps = {
  company: string;
  positions: Array<Position>;
  bullets: string[];
};

const jobs = [
  {
    company: "Autodesk (formerly Plangrid)",
    positions: [
      {
        title: "Senior Software Engineer",
        dates: {
          from: DateTime.local(2017, 6),
          to: DateTime.local(2021, 1),
        },
      },
    ],
    bullets: [
      "Redesigned and implemented the web tool for rendering & annotating blueprints.",
      "Prototyped web 3d model viewing tool using Autodesk 3d renderer, integrating it into Plangrid’s 2d viewing experience",
      "Implemented the new annotation rendering on web for the new merged Plangrid & Autodesk application.",
      "Brought a hackathon project to production which standardized and automated tracking calls between platforms",
    ],
  },
  {
    company: "CoinTent",
    positions: [
      {
        title: "Co-Founder / Director of Engineering",
        dates: {
          from: DateTime.local(2013, 10),
          to: DateTime.local(2017, 3),
        },
      },
    ],
    bullets: [
      "Setup customer service process, internal tools, and managed contractors",
      "Designed and executed outbound sales strategy and SEO marketing",
      "Wrote and maintained the Wordpress plugin and SDK",
      "Architected the front-end of the website and Javascript SDK using React and Require.js",
      "Directly supported integrations with 50+ publishers including Conde Nast, LA Times, The Atlantic,  and Wait But Why.",
    ],
  },
  {
    company: "Zynga",
    positions: [
      {
        title: "Engineering Manager",
        dates: {
          from: DateTime.local(2012, 9),
          to: DateTime.local(2013, 4),
        },
      },
      {
        title: "Senior Software Engineer",
        dates: {
          from: DateTime.local(2012, 5),
          to: DateTime.local(2012, 9),
        },
      },
      {
        title: "Software Engineer",
        dates: {
          from: DateTime.local(2010, 2),
          to: DateTime.local(2012, 5),
        },
      },
    ],
    bullets: [
      "Managed 5 engineers and oversaw the development of the HTML5 cross-platform apps for Words With Friends and Scramble With Friends.",
      "Costed features, planned releases, advised on architecture, and mentored engineers",
      "Developed standards and metrics for maintaining load time and run-time performance",
      "Integrated with central services to provide standardized tracking, payments and persistence from beginning to end",
      "Architected, costed and developed large client-side game features",
    ],
  },
];
const Resume = () => {
  const jobElements = jobs.map((job, index) => (
    <Job key={`${job.company}_${index}`} {...job} />
  ));

  return (
    <div className="px-28">
      <h1>Experience</h1>
      {jobElements}

      <h1>Education</h1>
      <h2 className="pt-8">University of Pennsylvania</h2>
      <h3>
        {" "}
        <span className="font-medium">Digital Media Design, BSE</span>
        {` | September 2005 - May 2009`}
      </h3>
      <p className="text-sm">Senior Thesis - Interactive Computer Animation</p>
      <p className="text-sm">
        - Programmed a haptic device to pose a human character using motion
        capture data which to help the end user create of the most natural
        looking human animation.
      </p>
    </div>
  );
};

const Job: React.FC<JobProps> = ({ company, positions, bullets }: JobProps) => {
  const dateFormat: DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  const titles = positions.map(({ title, dates: { to, from } }) => {
    const dateString = `${from.toLocaleString(
      dateFormat
    )} - ${to.toLocaleString(dateFormat)}`;

    return (
      <div key={`title_${title}`}>
        <h3>
          <span className="font-medium">{title}</span>
          {` | ${dateString}`}
        </h3>
      </div>
    );
  });
  return (
    <div className="my-10">
      <h2>{company}</h2>
      {titles}
      {bullets.map((b: string, index) => (
        <p key={`company_${index}`} className="text-sm">
          - {b}
        </p>
      ))}
    </div>
  );
};

export default Resume;
