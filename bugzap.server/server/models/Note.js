/* eslint-disable */ 
import mongoose from 'mongoose'
import mongodb from "mongodb";
const Schema = mongoose.Schema

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: mongodb.ObjectId, ref: 'Bug', required: true },
  creatorEmail: { type: String, required: true }
}, { timestamps: true })

Note.virtual('creator', {
  localField: 'creatorEmail',
  ref: 'Account',
  foreignField: 'name',
  justOne: true
})

export default Note
