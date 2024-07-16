export default function Button({ children, status, size, ...rest }) {
  const message = {
    Open: "Open",
    Upcoming: "Upcoming",
    Pending: "Pending",
    Over_due: "Over Due",
  };
  const statuses = {
    Open: "bg-gray-400",
    Upcoming: "bg-sky-400",
    Pending: "bg-purple-700",
    Over_due: "bg-amber-500 ",
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
