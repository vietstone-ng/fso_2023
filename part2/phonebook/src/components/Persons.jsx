const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul style={listStyle}>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  )
}

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

export default Persons
