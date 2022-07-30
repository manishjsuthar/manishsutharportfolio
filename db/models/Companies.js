import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo_url: {
    type: String,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: Array,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports =
  mongoose.models.Companies || mongoose.model('Companies', companySchema)
