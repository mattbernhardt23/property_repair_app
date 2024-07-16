import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "@features/projects/projectSlice";
import { useEffect, useState } from "react";
import { List, Card, Map } from "@components/ui/main";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // // Created a function to call the dispatch becasue dispatching from inside a useEffect is not permitted.
  // const callDispatch = () => dispatch(getProjects());

  // useEffect(() => {
  //   callDispatch(39);
  // }, []);

  // Check if 'projects' exists in the Redux state before destructuring it
  const { projects } = useSelector((state) => state.projectData);

  const [initialView, setInitialView] = useState({
    latitude: 37.4,
    longitude: -95.712,
    zoom: 3,
  });

  if (projects) {
    return (
      <div className="flex flex-col items-center h-full pt-28">
        <div className="w-11/12 max-h-screen rounded-lg">
          <List projects={projects} />
        </div>
        <Map
          initialView={initialView}
          projects={projects}
          // onClick={onClick}
          // onClick function that is being passed, may not need to be passed.
          // We want to be able to flick on a pop-up and be directed to that page
        />
      </div>
    );
  }

  return <div>Hello</div>;
}
