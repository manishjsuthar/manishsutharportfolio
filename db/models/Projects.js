import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Projects || mongoose.model('Projects', projectSchema)
