import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "@features/projects/projectSlice";
import { useEffect, useState } from "react";
import {
  Description,
  Instructions,
  Message,
  Notes,
  Photos,
  Schedule,
} from "@components/ui/project";

export default function Project() {
  const router = useRouter();
  const slug = router.query.slug;
  const id = parseFloat(slug);
  const dispatch = useDispatch();

  const callDispatch = () => dispatch(getProjects());

  useEffect(() => {
    if (!isNaN(id)) {
      callDispatch();
    }
  }, [id]);

  const { projects } = useSelector((state) => state.projectData);

  function selectProject(projects) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        return projects[i];
      }
    }
    return null;
  }

  const project = selectProject(projects);

  return (
    <>
      {project ? (
        <div className="pt-36">
          <Description project={project} />
          <Instructions project={project} />
          <Message project={project} />
          <Notes project={project} />
          <Photos project={project} />
          <Schedule project={project} />
        </div>
      ) : (
        <div className="pt-36">Project Not Found</div>
      )}
    </>
  );
}
