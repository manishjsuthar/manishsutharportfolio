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

const ProjectDetail = () => {
  const router = useRouter();
    const { id } = router.query;

  const [project, setProject] = useState("loading");

  useEffect(() => {
    async function getProjectDetailsById() {
    try {
      const response = await axios.post(`https://manishsuthar.vercel.app/api/graphql`, {
          "operationName": "Query",
             "query":
               "query Query($getProjectId: ID) { getProject(id: $getProjectId) { slug, tagline, description, img, name, tags, github, category, featured}}",
             "variables": {
                 "getProjectId": id
             }
      });
      setProject(response.data.data.getProject)
    } catch (err) {
      return false;
    }
  }
  getProjectDetailsById();
  }, [id]);

  console.log("projectDetails", project);

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
      {/* <PersonalDetailsContext.Provider value={personalDetails}>
        <ProjectDetailsContext.Provider value={projectDetails}> */}
      <Navbar />
      <div className="bg-blue pt-28 overflow-x-hidden">
        <ProjectDetailedPage project={project} />
      </div>
      <SocialBar />
      <Footer />
      {/* </ProjectDetailsContext.Provider>
      </PersonalDetailsContext.Provider> */}
    </>
  ) : (
    <NotFound />
  );
};

export default ProjectDetail;

// export async function getStaticProps(){
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   const projectDetails = (await getProjectDetails()) as Project[];
//   return { props: { personalDetails, projectDetails } };
// }

// export async function getStaticPaths(): Promise<unknown> {
//   const projectDetails = ((await getProjectDetails()) as Project[]) || [];
//   const paths = projectDetails.map((p) => {
//     return { params: { slug: p.slug } };
//   });
//   return {
//     paths,
//     fallback: false
//   };
// }
