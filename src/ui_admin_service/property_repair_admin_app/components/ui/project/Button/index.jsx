export default function Button({ children, status, ...rest }) {
  const message = {
    open: "Open",
    upcoming: "Upcoming",
    pending: "Pending",
    over_due: "Over Due",
  };
  const statuses = {
    open: "bg-gray-400",
    upcoming: "bg-sky-400",
    pending: "bg-purple-700",
    over_due: "bg-amber-500 ",
  };

  return (
    <button
      {...rest}
      className={`rounded-full px-4 py-1 font-bold text-xs text-white ${statuses[status]}`}
    >
      {message[status]}
    </button>
  );
}
