import dynamic from "next/dynamic";
import Navbar from "../shared/components/navbar";
import Loader from "../shared/components/loader";
import Footer from "../shared/components/footer";

import {
  PersonalDetailsContext,
  CompanyDetailsContext,
} from "../shared/utils/contexts";
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const WorkPage = dynamic(() => import("../components/work/index"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Work({personalDetails, companyDetails}) {
  return (
    <>
      <PersonalDetailsContext.Provider value={personalDetails}>
        <CompanyDetailsContext.Provider value={companyDetails}>
          <Navbar />
          <WorkPage />
          <Footer />
        </CompanyDetailsContext.Provider>
      </PersonalDetailsContext.Provider>
    </>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `https://manishsuthar.vercel.app/api/graphql`,
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
      query getMeDetail {
        getMeDetail {
          id
          name
          about
        }
      }
    `,
  });

  const companyData = await client.query({
    query: gql`
    query getAllCompanies { getAllCompanies {id name logo_url featured position startDate endDate responsibilities order } }
  `,
  });

return {
  props: {
    personalDetails: data.getMeDetail[0], companyDetails: companyData.data.getAllCompanies
  },
  revalidate: 10, // In seconds
} 
}
