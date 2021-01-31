export default class Bug {
  constructor({ _id, closed, description, title, closedDate, creatorEmail, updatedAt }) {
    this.id = _id
    this.closed = closed
    this.description = description
    this.title = title
    this.closedDate = closedDate
    this.creatorEmail = creatorEmail
    this.updatedAt = new Date(updatedAt).toDateString()
  }
}
