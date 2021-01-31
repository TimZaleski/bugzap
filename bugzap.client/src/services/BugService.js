/* eslint-disable */
import { AppState } from '../AppState'
import Bug from '../models/BugModel'
import Note from '../models/NoteModel'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {

    }
  }

  async getBugById(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.activeBug = new Bug(res.data)
      logger.log(AppState.activeBug + 'from bugService getById after api call')
    } catch (error) {

    }
  }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bus/' + bugId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (error) {

    }
  }

  async createBug(bug) {
    try {
      bug.creatorEmail = AppState.user.email
      const res = await api.post('api/bugs', bug)
      AppState.bugs.push(res.data)
    } catch (error) {

    }
  }

  async editBug(updatedBug, bugId) {
    try {
      const res = await api.put('api/bugs/' + bugId, updatedBug)
      const index = AppState.bugs.findIndex(bug => bug.id === res.data.id)
      AppState.bugs.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async deleteBug(bugId) {
    try {
      const res = await api.delete('api/bugs/' + bugId)
      const index = AppState.bugs.findIndex(bug => bug.id === res.data.id)
      AppState.bugs.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async createNoteForBug(note, bugId) {
    try {
      note.bug = bugId
      const res = await api.post('api/bugs/' + bugId + '/notes', note)
      AppState.notes = [...AppState.notes, new Note(res.data)]
    } catch (error) {

    }
  }

  async editNote(updatedNote, bugId, noteId) {
    try {
      const res = await api.put('api/bugs/' + bugId + '/notes/' + noteId, updatedNote)
      const index = AppState.lists.findIndex(list => list.id === res.data.id)
      AppState.lists.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async deleteNote(bugId, noteId) {
    try {
      await api.delete('api/bugs/' + bugId + '/notes/' + noteId)
      AppState.notes = AppState.notes.filter(note => (note.id !== noteId))
    } catch (error) {
    }
  }

}

export const bugService = new BugService()
