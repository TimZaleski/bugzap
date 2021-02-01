import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getNotesByBug(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async createNoteForBug(body) {
    return await dbContext.Notes.create(body)
  }

  async editNote(note) {
    const bg = await dbContext.Notes.findOneAndUpdate({ _id: note.id }, note, { new: true }).populate('creator')
    if (!bg) {
      throw new BadRequest('You are not the user, or this is not a valid note')
    }
    return bg
  }

  async deleteNote(id) {
    const note = await dbContext.Notes.findOneAndRemove({ _id: id })
    if (!note) {
      throw new BadRequest('You are not the user, or this is not a valid bug')
    }
    return note
  }
}

export const noteService = new NoteService()