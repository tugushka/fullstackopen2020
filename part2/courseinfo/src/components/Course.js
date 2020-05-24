import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  );
}

const Total = ({parts}) => {
  const totalExercises = parts.reduce( (sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <div>
      <h4>Number of exercises {totalExercises}</h4>
    </div>
  );
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course