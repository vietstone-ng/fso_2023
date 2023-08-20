const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.parts.map((part, index) => {
    return (
      <Part key={index} part={part.name} exercises={part.exercises} />
    )
  })

  return (
    <>
      {parts}
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises}</p>
  )
}

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

  const total = course.parts.map(part => part.exercises).reduce((x, y) => x + y)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={total} />
    </div>
  )
}

export default App