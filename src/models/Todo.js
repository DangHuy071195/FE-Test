class Todo {
  constructor(title, description, duedate, piority) {
    this.title = title
    this.description = description
    this.duedate = duedate
    this.piority = piority
    this.id = new Date().toISOString()
  }
}

export default Todo
