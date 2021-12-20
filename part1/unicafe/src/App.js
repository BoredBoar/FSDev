import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header= (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

  const Part= (props) => {
    console.log(props)
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }

  const Content= (props) => {
    return (
      <div>
        <Part part={props.part[0]} />
        <Part part={props.part[1]} />
        <Part part={props.part[2]} />
      </div>
    )
  }

  const Total= (props) => {
    return (
      <div>
        <p>Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App