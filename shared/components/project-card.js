/* eslint-disable react/require-default-props */
import Link from 'next/link';
import Tilt from 'react-tilt';


const ProjectCard = ({ project, filter }) => {
  let show = false;
  if (typeof project[filter.key] !== 'object' && project[filter.key] === filter.value) {
    show = true;
  } else if (
    (Object.prototype.toString.call(project[filter.key]) === '[object Array]' &&
      project[filter.key].includes(filter.value)) ||
    filter.value === 'all'
  ) {
    show = true;
  }

  console.log("project.id",project._id)
  return (
    show && (
      <>
        <Tilt className="Tilt cursor-pointer" options={{ max: 25 }}>
          <div
            className="my-4 mx-8 lg:mx-16 rounded-2xl
            transition-all duration-300 transform hover:opacity-80 hover:shadow-violet-5xl">
            <Link href={`/project/${project.id}`}>
              <img src={project.img} alt={project.name} className="rounded-2xl" />
            </Link>
          </div>
        </Tilt>
      </>
    )
  );
};

export default ProjectCard;
