import Projects from "../../../db/models/Projects"
import Companies from "../../../db/models/Companies"
import MeDetails from '../../../db/models/Me'
import ContactForm from "../../../db/models/ContactForm"

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllProjects: async () => {
      const getprojects = await Projects.find();
      return getprojects;
    },
    async getProject(_, { id }) {
      return await Projects.findById(id);
    },
    getAllCompanies: async () => {
        const getcompanies = await Companies.find();
        return getcompanies;
    },
    async getCompany(_, { id }) {
    return await Companies.findById(id);
    },
    getMeDetail: async () => {
        const getMe = await MeDetails.find();
        return getMe;
    },
    getAllContacts: async () => {
        const getcon = await ContactForm.find()
        return getcon;
    },
     async getContact(_, { id }) {
        return await ContactForm.findById(id);
        },
  },
  Mutation: {
    async createProject(parent, { project }, context, info) {
      const { slug, tagline, description, img, name, tags, github, category, featured} = project;
      const newProject = new Projects({slug, tagline, description, img, name, tags, github, category, featured});
      await newProject.save();
      return newProject;
    },
    async deleteProject(_, { id }) {
      await Projects.findByIdAndDelete(id);
      return "Project Deleted";
    },
    async updateProject(_, { id, project }) {
      const {slug, tagline, description, img, name, tags, github, category, featured} = project;
      const newProject = await Projects.findByIdAndUpdate(
        id,
        {
          $set: {
            slug, tagline, description, img, name, tags, github, category, featured
          },
        },
        {
          new: true,
        }
      );
      return newProject;
    },


    async createCompany(parent, { company }, context, info) {
        const { name, logo_url, featured, position, startDate, endDate, responsibilities, order} = company;
        const newCompany = new Companies({name, logo_url, featured, position, startDate, endDate, responsibilities, order});
        await newCompany.save();
        return newCompany;
      },
      async deleteCompany(_, { id }) {
        await Companies.findByIdAndDelete(id);
        return "Company Deleted";
      },
      async updateCompany(_, { id, company }) {
        const {name, logo_url, featured, position, startDate, endDate, responsibilities, order} = company;
        const newCompany = await Companies.findByIdAndUpdate(
          id,
          {
            $set: {
                name, logo_url, featured, position, startDate, endDate, responsibilities, order
            },
          },
          {
            new: true,
          }
        );
        return newCompany;
      },


      async createContact(parent, { contact }, context, info) {
        const {name, email, phone, message} = contact;
        const newContact = new ContactForm({name, email, phone, message});
        await newContact.save();
        return newContact;
      },
      async deleteContact(_, { id }) {
        await ContactForm.findByIdAndDelete(id);
        return "Contact Deleted";
      },
      async updateContact(_, { id, contact }) {
        const {name, email, phone, message} = contact;
        const newContact = await ContactForm.findByIdAndUpdate(
          id,
          {
            $set: {
                name, email, phone, message
            },
          },
          {
            new: true,
          }
        );
        return newContact;
      },
  },
};

module.exports = {
  resolvers,
};