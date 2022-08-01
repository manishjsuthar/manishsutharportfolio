import  Button from '../../shared/components/buttons';
import HeaderSmall from '../../shared/components/header-small';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import Loader from '../../shared/components/loader';
import { PersonalDetailsContext } from '../../shared/utils/contexts';
import Image from 'next/image'

export default function Landing() {
  const config = {
    type: 'spring',
    damping: 10,
    stiffness: 80
  };
  const router = useRouter();

  const personalDetails = useContext(PersonalDetailsContext);

  console.log("data",personalDetails)

  // const [medata, setmedata] = useState([]);

  // async function getMeDetails() {
  //   try {
  //     const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+`/api/graphql`, {
  //       operationName: "Query",
  //       query:
  //         "query Query {getMeDetail {id  name  about  logo resume profile_img work { company  designation logo } socialMedia { link image_file alt_text }  }  } ",
  //       variables: {},
  //     });
  //     setmedata(response.data.data.getMeDetail[0]);
  //   } catch (err) {
  //     return false;
  //   }
  // }
  // useEffect(() => {
  //   getMeDetails();
  // }, []);
  // if(!medata){
  //   return (
  //     <>
  //     <Loader/>
  //     </>
  //   )
  // }
  return (
    <>
      <img
        src="/images/vectors/ellipse.svg"
        alt="Ellipse Vector"
        className="absolute right-0 bottom-0 w-2/3 md:w-50p lg:w-35p pointer-events-none"
      />
      <img
        src="/images/vectors/triangle.svg"
        alt="Triangle 3d Vector"
        className="block md:hidden absolute right-1/3 top-28 w-1/4 md:w-16 animate-spin pointer-events-none"
      />
      <motion.div
        transition={config}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transitionDuration: '0.2s' }}
        exit={{ x: 0, opacity: 0 }}>
        <div className="grid grid-cols-12 gap-4 h-84.5vh ml-4 sm:mx-12 md:mx-16">
          <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col justify-center items-center">
            <div className="items-center w-3/4 -mt-10 relative">
              <img
                src="/images/vectors/triangle.svg"
                alt="Triangle 3d Vector"
                className="hidden md:block absolute right-0 top-0 w-2/3 md:w-16 animate-spin"
              />
              <HeaderSmall text="Who is he?" />
              <h1 className="text-3xl sm:text-2xl xl:text-1xl font-extrabold text-white leading-none mb-3">
                {personalDetails.name}
              </h1>
              <h5 className="text-7xl font-light text-violet text-justify">
                {personalDetails.about}
                </h5>
              <div className="grid sm:grid-cols-2 md:grid-cols-none xl:grid-cols-2 gap-4 mt-6">
                <div className="sm:col-span-1 xl:col-span-1">
                  <Button
                    type="solid"
                    text="Know More"
                    onClickHandler={() => router.push('#skills')}
                  />
                </div>
                <div className="sm:col-span-1 xl:col-span-1">
                  <Button
                    type="outlined"
                    text="Download Resume"
                    eslint-disable-next-line no-return-assign
                    onClickHandler={() => window.open('/resume.pdf', '_blank')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 text-justify text-white justify-end items-end ">
           
            <img
              src={'/images/bob.png'}
              alt="Manish Suthar"
              className="ml-auto w-100 lg:w-4/5 pointer-events-none text-right"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
