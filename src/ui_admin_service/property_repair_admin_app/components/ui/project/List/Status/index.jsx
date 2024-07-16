import Select from "react-select";

export default function StatusList({ setStatus }) {
  const statusOptions = [
    { value: "Open", label: "Open" },
    { value: "Pending", label: "Pending" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "Overdue", label: "Overdue" },
    { value: "Completed", label: "Completed" },
    { value: "Invoiced", label: "Invoiced" },
    { value: "Paid", label: "Paid" },
  ];

  const handleChange = (value) => {
    setStatus(value.value);
  };

  return (
    <div className="w-full h-full">
      <Select
        className="focus:ring-indigo-500 shadow-md focus:border-indigo-500 block text-xl sm:text-sm text-gray-800 border-white rounded-md bg-white"
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
        options={statusOptions}
        onChange={handleChange}
        placeholder="Select a Job Status"
        instanceId={"anythingCanGoHereClearsPropsIdError"}
      />
    </div>
  );
}
