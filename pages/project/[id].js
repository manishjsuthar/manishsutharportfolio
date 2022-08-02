import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../shared/components/footer";
import Loader from "../../shared/components/loader";
import Navbar from "../../shared/components/navbar";
import SocialBar from "../../shared/components/socialbar";
// import { PersonalDetails, Project } from '@utils/types';
// import { PersonalDetailsContext, ProjectDetailsContext } from '@utils/contexts';
import ProjectDetailedPage from "../../components/project-details/index";
import NotFound from "../404";
import axios from 'axios'

import { PersonalDetailsContext, ProjectDetailsContext } from '../../shared/utils/contexts';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const ProjectDetail = ({personalDetails,projectDetails}) => {
  // const router = useRouter();
  //   const { id } = router.query;

  // const [project, setProject] = useState("loading");

  // useEffect(() => {
  //   async function getProjectDetailsById() {
  //   try {
  //     const response = await axios.post(`https://manishsuthar.vercel.app/api/graphql`, {
  //         "operationName": "Query",
  //            "query":
  //              "query Query($getProjectId: ID) { getProject(id: $getProjectId) { slug, tagline, description, img, name, tags, github, category, featured}}",
  //            "variables": {
  //                "getProjectId": id
  //            }
  //     });
  //     setProject(response.data.data.getProject)
  //   } catch (err) {
  //     return false;
  //   }
  // }
  // getProjectDetailsById();
  // }, [id]);

  console.log("projectDetails", projectDetails);

//   useEffect(() => {
//     const { slug } = router.query;
//     const found = projectdata.find((p) => p.slug === slug);
//     setProject(found);
//   }, [project]);

  if (project === "loading") {
    return <Loader />;
  }
  return project ? (
    <>
      <PersonalDetailsContext.Provider value={personalDetails}>
        <ProjectDetailsContext.Provider value={projectDetails}>
      <Navbar />
      <div className="bg-blue pt-28 overflow-x-hidden">
        {/* <ProjectDetailedPage project={projectDetails} /> */}
      </div>
      <SocialBar personalDetailsdata={personalDetails.socialMedia} />
      <Footer />
      </ProjectDetailsContext.Provider>
      </PersonalDetailsContext.Provider>
    </>
  ) : (
    <NotFound />
  );
};

export default ProjectDetail;

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
    cache: new InMemoryCache()
  });

  const projectData  = await client.query({
    query: gql`
    query getAllProjects { getAllProjects {id, slug, tagline, description, img, name, tags, github, category, featured} }
    `
  });

  const projectDataArray = projectData.data.getAllProjects

  const paths = projectDataArray.map((product) => ({
    params: { id: product.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
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
  query GetProject($getProjectId: ID) {
    getProject(id: $getProjectId) {
      id
      name
      img
      slug
      description
      tagline
      tags
      github
      category
      featured
    }
  }
  `,
  variables: {
      "getProjectId": params.id
  }
});

return {
  props: {
    personalDetails: data.getMeDetail[0], projectDetails: projectData
  },
  revalidate: 30, // In seconds
}
}

// export async function getStaticProps(){
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   const projectDetails = (await getProjectDetails()) as Project[];
//   return { props: { personalDetails, projectDetails } };
// }

