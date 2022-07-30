import  Navbar from '../shared/components/navbar';
import  Loader from '../shared/components/loader';
import  Footer from '../shared/components/footer';
import dynamic from 'next/dynamic';

const ConnectPage = dynamic(() => import('../components/connect/index'), {
  ssr: false,
  loading: () => <Loader />
});

const Contact = () => {
  return (
    <>
        <Navbar />
        <ConnectPage />
        <Footer />
    </>
  );
};

export default Contact;

// export async function getStaticProps() {
//   const personalDetails = (await getPersonalDetails()) as PersonalDetails;
//   return { props: { personalDetails } };
// }
