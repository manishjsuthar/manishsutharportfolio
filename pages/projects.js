import dynamic from "next/dynamic";
import Navbar from "../shared/components/navbar";
import Loader from "../shared/components/loader";
import Footer from "../shared/components/footer";
import SocialBar from "../shared/components/socialbar";
import {
  PersonalDetailsContext,
  ProjectDetailsContext,
} from "../shared/utils/contexts";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const ProjectsPage = dynamic(() => import("../components/projects/index"), {
  ssr: false,
  loading: () => <Loader />,
});

const Projects = ({ personalDetails, projectDetails }) => {
  return (
    <>
      <PersonalDetailsContext.Provider value={personalDetails}>
        <ProjectDetailsContext.Provider value={projectDetails}>
          <Navbar />
          <ProjectsPage />
          <SocialBar />
          <Footer />
        </ProjectDetailsContext.Provider>
      </PersonalDetailsContext.Provider>
    </>
  );
};
export default Projects;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `https://manishsuthar.vercel.app/api/graphql`,
    cache: new InMemoryCache(),
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
        }
      }
    `,
  });

  const projectData = await client.query({
    query: gql`
      query getAllProjects {
        getAllProjects {
          id
          slug
          tagline
          description
          img
          name
          tags
          github
          category
          featured
        }
      }
    `,
  });

  return {
    props: {
      personalDetails: data.getMeDetail[0],
      projectDetails: projectData.data.getAllProjects,
    },
    revalidate: 20, // In seconds
  };
}
