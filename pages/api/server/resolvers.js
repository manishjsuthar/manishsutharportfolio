import Projects from "../../../db/models/Projects";
import Companies from "../../../db/models/Companies";
import MeDetails from "../../../db/models/Me";
import ContactForm from "../../../db/models/ContactForm";
const nodemailer = require("nodemailer");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllProjects: async () => {
      const getprojects = await Projects.find();
      return getprojects;
    },
    async getProject(_, { id }) {
      const getProjectJson = await Projects.findById(id);
      return getProjectJson;
    },
    getAllCompanies: async () => {
      const getcompanies = await Companies.find();
      return getcompanies;
    },
    async getCompany(_, { id }) {
      const getcompany = await Companies.findById(id);
      return getcompany;
    },
    getMeDetail: async () => {
      const getMeRes = await MeDetails.find();
      return getMeRes;
    },
    getAllContacts: async () => {
      const getcon = await ContactForm.find();
      return getcon;
    },
    async getContact(_, { id }) {
      const getcontact = await ContactForm.findById(id);
      return getcontact;
    },
  },
  Mutation: {
    async createProject(parent, { project }, context, info) {
      const {
        slug,
        tagline,
        description,
        img,
        name,
        tags,
        github,
        category,
        featured,
      } = project;
      const newProject = new Projects({
        slug,
        tagline,
        description,
        img,
        name,
        tags,
        github,
        category,
        featured,
      });
      await newProject.save();
      return newProject;
    },
    async deleteProject(_, { id }) {
      await Projects.findByIdAndDelete(id);
      return "Project Deleted";
    },
    async updateProject(_, { id, project }) {
      const {
        slug,
        tagline,
        description,
        img,
        name,
        tags,
        github,
        category,
        featured,
      } = project;
      const newProject = await Projects.findByIdAndUpdate(
        id,
        {
          $set: {
            slug,
            tagline,
            description,
            img,
            name,
            tags,
            github,
            category,
            featured,
          },
        },
        {
          new: true,
        }
      );
      return newProject;
    },

    async createCompany(parent, { company }, context, info) {
      const {
        name,
        logo_url,
        featured,
        position,
        startDate,
        endDate,
        responsibilities,
        order,
      } = company;
      const newCompany = new Companies({
        name,
        logo_url,
        featured,
        position,
        startDate,
        endDate,
        responsibilities,
        order,
      });
      await newCompany.save();
      return newCompany;
    },
    async deleteCompany(_, { id }) {
      await Companies.findByIdAndDelete(id);
      return "Company Deleted";
    },
    async updateCompany(_, { id, company }) {
      const {
        name,
        logo_url,
        featured,
        position,
        startDate,
        endDate,
        responsibilities,
        order,
      } = company;
      const newCompany = await Companies.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            logo_url,
            featured,
            position,
            startDate,
            endDate,
            responsibilities,
            order,
          },
        },
        {
          new: true,
        }
      );
      return newCompany;
    },

    async createContact(parent, { contact }, context, info) {
      const { name, email, phone, message } = contact;
      const newContact = new ContactForm({ name, email, phone, message });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOption = {
        from: `${email}`,
        to: `${process.env.EMAIL}`,
        subject: `New mail from ${email}`,
        text: `
    ${name} wrote:
    Phone no.: ${phone}
    ${message}
    `,
      };

      transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err);
          res.send("error" + JSON.stringify(err));
        } else {
          console.log("mail send");
          res.send("success");
        }
      });
      await newContact.save();
      return newContact;
    },
    async deleteContact(_, { id }) {
      await ContactForm.findByIdAndDelete(id);
      return "Contact Deleted";
    },
    async updateContact(_, { id, contact }) {
      const { name, email, phone, message } = contact;
      const newContact = await ContactForm.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            email,
            phone,
            message,
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
