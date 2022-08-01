import  Navbar from '../shared/components/navbar';
import  Loader from '../shared/components/loader';
import  Footer from '../shared/components/footer';
import dynamic from 'next/dynamic';
import { PersonalDetailsContext } from '../shared/utils/contexts';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const ConnectPage = dynamic(() => import('../components/connect/index'), {
  ssr: false,
  loading: () => <Loader />
});

const Contact = ({personalDetails}) => {
  return (
    <>
    <PersonalDetailsContext.Provider value={personalDetails}>
        <Navbar />
        <ConnectPage />
        <Footer />
        </PersonalDetailsContext.Provider>
    </>
  );
};

export default Contact;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    query getMeDetail {
      getMeDetail {
        socialMedia {
          link
          image_file
          alt_text
        }
      }
    }
    `
});

return {
  props: {
    personalDetails: data.getMeDetail[0]
  },
  revalidate: 30, // In seconds
}
}