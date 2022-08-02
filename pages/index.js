import dynamic from 'next/dynamic';
import  Footer from '../shared/components/footer';
import Loader from '../shared/components/loader';
import  Navbar from '../shared/components/navbar';
import SocialBar  from '../shared/components/socialbar';
import { PersonalDetailsContext, ProjectDetailsContext } from '../shared/utils/contexts';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const HomePage = dynamic(() => import('../components/home/index')
, {
  ssr: false,
  loading: () => <Loader />
}
);

export default function Home({personalDetails, projectDetails}) {
  return (
    <>
    <PersonalDetailsContext.Provider value={personalDetails}>
        <ProjectDetailsContext.Provider value={projectDetails}>
          <Navbar />
          <SocialBar personalDetailsdata={personalDetails.socialMedia}/>
          <HomePage />
          <Footer />
        </ProjectDetailsContext.Provider>
      </PersonalDetailsContext.Provider>
    </>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    query getMeDetail {
      getMeDetail {
        id
          name
          about
          work {
            company
            designation
            logo
          }
          logo
          resume
          profile_img
          socialMedia {
            link
            image_file
            alt_text
          }
      }} 
    `
});

const projectData  = await client.query({
  query: gql`
  query getAllProjects { getAllProjects {id, slug, tagline, description, img, name, tags, github, category, featured} }
  `
});

return {
  props: {
    personalDetails: data.getMeDetail[0], projectDetails: projectData.data.getAllProjects
  },
  revalidate: 30, // In seconds
}

//  async function getPersonalDetails() {
//   try {
//     const res1 = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+`/api/graphql/`, {
//       operationName: "Query",
//       query:
//         "query Query {getMeDetail {id  name  about  logo resume profile_img work { company  designation logo } socialMedia { link image_file alt_text }  }  } ",
//       variables: {},
//     });
//     const personalDetail = await res1.text()
//     console.log("personalDetails",(personalDetail))
//     return personalDetail
//   } catch (err) {
//     // console.log("err",err)
//     return err;
//   }
//  }
//  async function getProjectDetails() {
//   try {
//     const res2 = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+`/api/graphql/`, {
//       "operationName": "Query",
//       "query": "query Query { getAllProjects {id, slug, tagline, description, img, name, tags, github, category, featured} }",
//       "variables": {}
//   } );
//   const projectDetail = await res2.text()
//     return projectDetail
//   } catch (err) {
//     return err;
//   }
//  }
//  const personalDetails = await getPersonalDetails();
//  const projectDetails = await getProjectDetails();
 
  // return {
  //   props:{ personalDetails: personalDetails, projectDetails: projectDetails}
  // } // will be passed to the page component as props
}
