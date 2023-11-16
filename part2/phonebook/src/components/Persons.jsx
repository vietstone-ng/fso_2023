const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={onDelete}>delete</button>
    </li>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <ul style={listStyle}>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          onDelete={() => onDelete(person)}
        />
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
