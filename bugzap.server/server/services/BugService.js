import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById({ _id: id }).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(bug) {
    const bg = await dbContext.Bugs.findOneAndUpdate({ _id: bug.id }, bug, { new: true }).populate('creator')
    if (!bg) {
      throw new BadRequest('You are not the user, or this is not a valid bug')
    }
    return bg
  }

  async delete(bug) {
    bug.closed = true;
    const bg = await dbContext.Bugs.findOneAndUpdate({ _id: bug.id }, bug, { new: true }).populate('creator')
    if (!bg) {
      throw new BadRequest('You are not the user, or this is not a valid bug')
    }
    return bg
  }
}

export const bugService = new BugService()