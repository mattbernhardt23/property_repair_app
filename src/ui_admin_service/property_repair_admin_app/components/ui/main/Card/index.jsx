import { useDispatch } from "react-redux";

export default function Card({ onClick, project }) {
  const dispatch = useDispatch();

  const handleClick = (project_id) => {
    // Router to Project Page
    return 1;
  };

  return (
    <>
      <div onClick={() => handleClick(project.id)} className="hover:underline">
        <div className="grid grid-cols-12 pb-2">
          <div className="col-span-5">
            <div className="flex justify-center">{project.address}</div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center text-sm sm:text-base leading-tight font-medium hover:underline hover:cursor-pointer">
              {project.city}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex justify-center">{project.type}</div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-center">{project.status}</div>
          </div>
        </div>
      </div>
    </>
  );
}
