import React, { FC } from "react";

type HeaderProps = {
  course: string;
};
const Header: FC<HeaderProps> = ({ course }) => {
  return <h1>{course}</h1>;
};

type ContentObj = {
  name: string;
  exercises: number;
  id: number;
};

const Part: FC<ContentObj> = ({ id, name, exercises }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

type ContentProps = {
  parts: ContentObj[];
};

const Content: FC<ContentProps> = ({ parts }) => {
  const allContents = parts.map(part => {
    return <Part id={part.id} name={part.name} exercises={part.exercises} />;
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
  return <p>Total of {sum} exercises</p>;
};
type CourseProps = {
  course: {
    name: string;
    id: number;
    parts: ContentObj[];
  };
};

export const Course: FC<CourseProps> = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
