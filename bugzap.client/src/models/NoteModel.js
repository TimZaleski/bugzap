export default class Note {
  constructor({ _id, content, bug, flagged, creatorEmail }) {
    this.id = _id
    this.content = content
    this.bug = bug
    this.flagged = flagged
    this.creatorEmail = creatorEmail
  }
}
