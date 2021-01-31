import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  closedDate: { type: Date}
}, { timestamps: true })

Bug.virtual('creator', {
  localField: 'creatorEmail',
  ref: 'Account',
  foreignField: 'name',
  justOne: true
})

export default Bug
