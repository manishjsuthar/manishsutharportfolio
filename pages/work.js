import dynamic from 'next/dynamic';
import  Navbar from '../shared/components/navbar';
import  Loader from '../shared/components/loader';
import  Footer from '../shared/components/footer';

const WorkPage = dynamic(() => import('../components/work/index'), {
  ssr: false,
  loading: () => <Loader />
});

const Work = () => {
  return (
    <>
          <Navbar />
          <WorkPage />
          <Footer />
    </>
  );
};

export default Work;

// export async function getStaticProps(): Promise<{
//   props: { personalDetails: PersonalDetails; companyDetails: Company[] };
// }> {
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   const companyDetails = (await getCompanyDetails()) as Company[];
//   return { props: { personalDetails, companyDetails } };
// }
