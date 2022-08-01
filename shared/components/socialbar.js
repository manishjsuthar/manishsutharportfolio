import {ApolloClient, InMemoryCache, gql} from '@apollo/client';


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

export default function SocialBar({personalDetailsdata}) {
  return (
    <div className="fixed left-3 md:left-5 bottom-0 z-30">
      <div className="flex flex-col  justify-center items-center ">
        {personalDetailsdata.map((item) => {
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