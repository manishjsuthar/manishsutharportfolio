import ProjectCard from '../../shared/components/project-card';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios'

const ProjectsPage = () => {
  const [projectdata, setprojectdata] = useState([])

async function getProjectDetails() {
  try {
    const response = await axios.post(`/api/graphql`, {
      "operationName": "Query",
      "query": "query Query { getAllProjects {id, slug, tagline, description, img, name, tags, github, category, featured} }",
      "variables": {}
  } );
  console.log("response",response)
  setprojectdata(response.data.data.getAllProjects)
  } catch (err) {
    return false;
  }
}

useEffect(() => {
  getProjectDetails()
}, [])

  const category = [{ value: 'all', label: 'ALL' }];
  projectdata.forEach((p) =>
    p.category.forEach((cat) => {
      if (!category.find((c) => c.value === cat))
        category.push({ value: cat, label: cat.toUpperCase() });
    })
  );
  const [active, setActive] = useState('all');

  function changeProjects(c) {
    setActive(c.value);
  }
  useEffect(() => {}, [active]);
  return (
    <>
      <div className="bg-blue pt-28 pb-20">
        <div className="overflow-x-hidden">
          <div className="pt-10 ml-4 sm:mx-12 md:mx-16">
            <div className="mb-10">
              <h1 className="text-center text-3xl sm:text-2xl xl:text-3xl font-extrabold text-white leading-none mb-6">
                Something that he has build
              </h1>
              <p className="text-center text-sm sm:text-7xl font-light text-white leading-none mb-6">
                with love, expertise and pinch of magical ingredients
              </p>
            </div>
            <div>
              <div className="mx-auto text-center">
                {category.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => changeProjects(c)}
                    className={`${
                      active === c.value
                        ? 'text-blue bg-pink border-transparent'
                        : 'text-white border-pink'
                    } w-32 mx-4
                    border-2 py-2 rounded-xl lg:mx-4 outline-none mb-2 focus:outline-none transition-all hover:shadow-light-3xl
                    `}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 place-items-center">
              {projectdata.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.id}
                  filter={{ key: 'category', value: active }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
