import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const MeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  work: [
    {
      company: {
        type: String,
      },
      designation: {
        type: String,
      },
      logo: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  profile_img:{
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  socialMedia: [
    {
      link: {
        type: String,
        required: true,
      },
      image_file: {
        type: String,
        required: true,
      },
      alt_text: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports =
  mongoose.models.MeDetails || mongoose.model('MeDetails', MeSchema)
