import { useState } from "react";

export default function QuoteButton({
  children,
  project,
  handleQuoteClick,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const statuses = {
    Open: "gray-400",
    Submitted: "bg-blue-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-600",
  };

  let status = statuses[project.quote_status] || "gray-400"; // Default to gray-400 if
  return (
    <button
      {...rest}
      className={`rounded-full w-40 py-4 font-bold text-md text-black border-2 ${status} hover:bg-green-400 hover:text-white mx-4`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={handleQuoteClick}
    >
      {hover && project.quote_status === "Open"
        ? "Create Quote"
        : hover
        ? "View Quote"
        : `Quote ${project.quote_status}`}
    </button>
  );
}
