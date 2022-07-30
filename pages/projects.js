import dynamic from 'next/dynamic';
import  Navbar from '../shared/components/navbar';
import  Loader from '../shared/components/loader';
import  Footer from '../shared/components/footer';
import  SocialBar from '../shared/components/socialbar';

const ProjectsPage = dynamic(() => import('../components/projects/index'), {
  ssr: false,
  loading: () => <Loader />
});

const Projects = () => {
  return (
    <>
          <Navbar />
          <ProjectsPage />
          <SocialBar />
          <Footer />
    </>
  );
};
export default Projects;

// export async function getStaticProps(): Promise<{
//   props: { personalDetails: PersonalDetails; projectDetails: Project[] };
// }> {
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   const projectDetails = (await getProjectDetails()) as Project[];
//   return { props: { personalDetails, projectDetails } };
// }
