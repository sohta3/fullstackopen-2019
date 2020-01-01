import React, { FC } from "react";
import ReactDOM from "react-dom";

type HeaderProps = {
  course: string;
};
const Header: FC<HeaderProps> = ({ course }) => {
  return <h1>{course}</h1>;
};

type ContentObj = {
  part: string;
  exercises: number;
};
type ContentProps = {
  parts: ContentObj[];
};

const Part: FC<ContentObj> = ({ part, exercises }) => {
  return (
    <p key={part}>
      {part} {exercises}
    </p>
  );
};

const Content: FC<ContentProps> = ({ parts }) => {
  const allContents = parts.map(part => {
    return <Part key={part.part} part={part.part} exercises={part.exercises} />;
  });

  return <>{allContents}</>;
};

type TotalProps = {
  parts: ContentObj[];
};

const Total: FC<TotalProps> = ({ parts }) => {
  const sum = parts.reduce((prev: number, current: ContentObj) => {
    return prev + current.exercises;
  }, 0);
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
