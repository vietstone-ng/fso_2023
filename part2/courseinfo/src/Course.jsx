const Header = (props) => {
  return <h3>{props.course}</h3>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts.map((part) => {
    return <Part key={part.id} part={part.name} exercises={part.exercises} />
  })

  return <>{parts}</>
}

const Total = (props) => {
  return <b>total of {props.exercises} exercises</b>
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total
        exercises={props.course.parts
          .map((part) => part.exercises)
          .reduce((x, y) => x + y)}
      />
    </>
  )
}

export default Course
