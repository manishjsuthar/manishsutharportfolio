import { useEffect, useState } from 'react';
import axios from 'axios'

export default function CompanyDetails(props) {
  const [companyDetail, setCompanyDetail] = useState();

  async function getCompaniesDetails() {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL +`/api/graphql`, {
        "operationName": "Query",
        "query": "query Query($getCompanyId: ID) {getCompany(id: $getCompanyId){id name logo_url featured position startDate endDate responsibilities order } }",
        "variables": {
          "getCompanyId": props.activeCompanyId
        }
    } );
    setCompanyDetail(response.data.data.getCompany)
    } catch (err) {
      return false;
    }
  }
  
  useEffect(() => {
    getCompaniesDetails()
  }, []);

  console.log("cid",companyDetail)
  return (
    <>
      <div className="bg-violet rounded-2xl px-10 py-10 w-60 sm:w-72 mx-16 sm:mx-16 md:mx-32 md:w-80 lg4:w-96 xl:min-w-full xl:min-h-full">
        <p className="font-bold mb-2 text-7xl lg:text-6xl cursor-auto">{companyDetail?.name}</p>
        <p className="mb-1 text-lg">{companyDetail?.position}</p>
        <p className="italic text-sm lg:text-7xl">
          {companyDetail?.startDate} - {companyDetail?.endDate ? companyDetail?.endDate : 'Present'}
        </p>
        <ul className="text-sm lg:text-7xl mt-8 list-disc ml-5 z-30 cursor-auto">
          {companyDetail?.responsibilities.map((r) => {
            return <li key={r}>{r}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
