import { useContext, useState, useEffect } from 'react';
import axios from 'axios'


function SocialIcon({ alt_text, image_file, link }) {
  return (
    <a href={link}>
      <img
        src={image_file}
        alt={alt_text}
        className="w-6 md:w-8 mb-2 md:my-2 transition-all hover:opacity-40 transform hover:scale-75"
      />
    </a>
  );
}

export default function SocialBar() {
  const [medata, setmedata] = useState([]);

  async function getMeDetails() {
    try {
      const response = await axios.post(`/api/graphql`, {
        operationName: "Query",
        query:
          "query Query {getMeDetail {id  name  about  logo resume profile_img work { company  designation logo } socialMedia { link image_file alt_text }  }  } ",
        variables: {},
      });
      setmedata(response.data.data.getMeDetail[0].socialMedia);
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    getMeDetails();
  }, []);
  return (
    <div className="fixed left-3 md:left-5 bottom-0 z-30">
      <div className="flex flex-col  justify-center items-center ">
        {medata.map((item) => {
          return (
            <SocialIcon
              link={item.link}
              image_file={item.image_file}
              alt_text={item.alt_text}
              key={item.image_file}
            />
          );
        })}
        <div className="h-20 md:h-32 mt-2 w-1/12 bg-violet" />
      </div>
    </div>
  );
}
