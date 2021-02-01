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
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (error) {

    }
  }

  async createBug(bug) {
    try {
      bug.creatorEmail = AppState.user.email
      const res = await api.post('api/bugs', bug)
      AppState.createdBug = new Bug(res.data)
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

  async deleteBug(bug, bugId) {
    try {
      const res = await api.put('api/bugs/' + bugId + '/del', bug)
      const index = AppState.bugs.findIndex(bug => bug.id === res.data.id)
      AppState.bugs.splice(index, 1, res.data)
      AppState.activeBug = new Bug(res.data)
    } catch (error) {

    }
  }

  async createNoteForBug(note, bug) {
    try {
      note.creatorEmail = AppState.user.email
      note.bug = bug.id
      const res = await api.post('api/bugs/' + bug.id + '/notes', note)
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
