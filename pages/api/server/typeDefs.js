import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs = gql`
  type Project {
    id: ID
    name: String
    img: String
    slug: String
    description: String
    tagline: String
    tags: [String]
    github: String
    category: [String]
    featured: Boolean
  }

  input ProjectInput {
    name: String
    img: String
    slug: String
    description: String
    tagline: String
    tags: [String]
    github: String
    category: [String]
    featured: Boolean
  }

  type Company {
    id:ID
    name: String
    logo_url: String
    featured: Boolean
    position: String
    startDate: String
    endDate: String
    responsibilities: [String]
    order: Int
  }

  input CompanyInput {
    name: String
    logo_url: String
    featured: Boolean
    position: String
    startDate: String
    endDate: String
    responsibilities: [String]
    order: Int
  }

  type WorkType {
    company: String
    designation: String
    logo: String
  }

  type socialMediaType {
    link: String
    image_file: String
    alt_text: String
  }

  type MeDetail {
    id:ID
    name: String
    about: String
    work: [WorkType!]
    logo: String
    resume: String
    profile_img: String
    socialMedia: [socialMediaType!]
  }
  
  input MeInput {
    name: String
    about: String
    work: [String]
    logo: String
    resume: String
    profile_img: String
    socialMedia: [String]
  }

  type ContactDetail {
    id:ID
    name: String
    email: String
    phone: Int
    message: String
  }

  input ContactInput {
    name: String
    email: String
    phone: Int
    message: String
  }

  type Query {
    hello: String
    getAllProjects: [Project]
    getProject(id: ID): Project
    getAllCompanies: [Company]
    getCompany(id: ID): Company
    getMeDetail: [MeDetail]
    getAllContacts: [ContactDetail]
    getContact: ContactDetail
  }

  type Mutation {
    createProject(project: ProjectInput): Project
    deleteProject(id: ID): String
    updateProject(id: ID, project: ProjectInput): Project
    
    createCompany(company: CompanyInput): Company
    deleteCompany(id: ID): String
    updateCompany(id: ID, company: CompanyInput): Company

    createContact(contact: ContactInput): ContactDetail
    deleteContact(id: ID): String
    updateContact(id: ID, contact: ContactInput): ContactDetail
  }
`;
