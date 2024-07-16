import { useState } from "react";

export default function AddButton({
  children,
  project,
  handleSubmit,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      {...rest}
      className={`rounded-full w-40 py-4 mx-8 font-bold text-md text-white border-2 bg-blue-500 hover:bg-green-500 `}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={handleSubmit}
    >
      {hover ? "Submit" : "Add Note"}
    </button>
  );
}
