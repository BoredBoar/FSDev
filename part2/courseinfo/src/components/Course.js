import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    return(
      <p><strong>Number of exercises {course.parts.reduce((sum, part) => (sum += part.exercises),0)}</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Course = ({courses}) => {
    return (
      courses.map(course =>
        <div>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )
    )
  }

export default Course