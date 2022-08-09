import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../shared/components/footer";
import Loader from "../../shared/components/loader";
import Navbar from "../../shared/components/navbar";
import SocialBar from "../../shared/components/socialbar";
import ProjectDetailedPage from "../../components/project-details/index";
import NotFound from "../404";
import axios from "axios";

import { PersonalDetailsContext } from "../../shared/utils/contexts";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const ProjectDetail = ({ personalDetails }) => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState("loading");

  useEffect(() => {
    async function getProjectDetailsById() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
          {
            operationName: "Query",
            query:
              "query Query($getProjectId: ID) { getProject(id: $getProjectId) { slug, tagline, description, img, name, tags, github, category, featured, url}}",
            variables: {
              getProjectId: id,
            },
          }
        );
        setProject(response.data.data.getProject);
      } catch (err) {
        return false;
      }
    }
    getProjectDetailsById();
  }, [id]);

  if (project === "loading") {
    return <Loader />;
  }
  return project ? (
    <>
      <PersonalDetailsContext.Provider value={personalDetails}>
        <Navbar />
        <div className="bg-blue pt-28 overflow-x-hidden">
          <ProjectDetailedPage project={project} />
        </div>
        <SocialBar personalDetailsdata={personalDetails.socialMedia} />
        <Footer />
      </PersonalDetailsContext.Provider>
    </>
  ) : (
    <NotFound />
  );
};

export default ProjectDetail;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
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

  return {
    props: {
      personalDetails: data.getMeDetail[0],
    },
  };
}
