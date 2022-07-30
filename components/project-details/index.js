import Details from './details';
import Landing from './landing';


export default function ProjectDetailedPage({ project }){
  return (
    <>
      <div className="ml-4 sm:mx-12 md:mx-16">
        <Landing project={project} />
        <Details project={project} />
      </div>
    </>
  );
}
