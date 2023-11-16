const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  switch (message.type) {
    case 'error':
      style.color = 'red'
      break
    case 'success':
      style.color = 'green'
      break
    default:
      break
  }

  return <div style={style}>{message.content}</div>
}

export default Notification
