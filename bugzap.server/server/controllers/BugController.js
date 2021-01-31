import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/:id/notes', this.createNoteForBug)
      .put('/:id', this.edit)
      .put('/:id/notes/:id', this.editNote)
      .delete('/:id', this.delete)
      .delete('/:id/notes/:id', this.deleteNote)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const data = await bugService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBug(req, res, next) {
    try {
      const data = await noteService.getNotesByBug({ bugId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await bugService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async createNoteForBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await noteService.createNoteForBug(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      if (!req.body.close)
      {
        const data = await bugService.edit(req.body)
        res.send(data)
      }
      else
      {
        res.send('Can\'t edit this bug, it is closed.')
      }
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await noteService.editNote(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await bugService.delete(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteNote(req, res, next) {
    try {
      await noteService.deleteNote(req.params.id)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
