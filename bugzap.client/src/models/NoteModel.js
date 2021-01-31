export default class Note {
  constructor({ id, content, bug, flagged, creatorEmail }) {
    this.id = id
    this.content = content
    this.bug = bug
    this.flagged = flagged
    this.creatorEmail = creatorEmail
  }
}
