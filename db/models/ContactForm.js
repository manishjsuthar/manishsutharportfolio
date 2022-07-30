import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ContactFormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

module.exports =
  mongoose.models.ContactForm || mongoose.model('ContactForm', ContactFormSchema)
