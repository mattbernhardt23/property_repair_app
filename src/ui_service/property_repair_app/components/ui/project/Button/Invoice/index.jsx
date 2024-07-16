import { useState } from "react";

export default function InvoiceButton({
  children,
  project,
  handleInvoiceClick,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const statuses = {
    Open: "gray-400",
    Submitted: "bg-blue-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-600",
  };

  let status = statuses[project.invoice_status] || "gray-400"; // Default to gray-400 if
  return (
    <button
      {...rest}
      className={`rounded-full w-40 py-4 mx-8 font-bold text-md text-black border-2 ${status} hover:bg-green-400 hover:text-white`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={handleInvoiceClick}
    >
      {hover && project.invoice_status === "Open"
        ? "Create Invoice"
        : hover
        ? "View Invoice"
        : `Invoice ${project.invoice_status}`}
    </button>
  );
}
