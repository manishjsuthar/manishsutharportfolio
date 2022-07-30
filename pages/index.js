import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import  Footer from '../shared/components/footer';
import Loader from '../shared/components/loader';
import  Navbar from '../shared/components/navbar';
import SocialBar  from '../shared/components/socialbar';


export default function Home() {
  return (
    <>
          <Navbar />
          <SocialBar />
          <HomePage />
          <Footer />
    </>
  )
}

const HomePage = dynamic(() => import('../components/home/index')
, {
  ssr: false,
  loading: () => <Loader />
}
);

// export async function getStaticProps(){
//   props: { personalDetails: PersonalDetails; projectDetails: Project[] };
// }{
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   const projectDetails = (await getProjectDetails()) as Project[];
//   return { props: { personalDetails, projectDetails } };
// }
