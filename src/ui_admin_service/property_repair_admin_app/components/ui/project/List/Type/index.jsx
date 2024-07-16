import Select from "react-select";

export default function TypeList({ setType }) {
  const typeOptions = [
    { value: "Carpentry", label: "Carpentry" },
    { value: "Drywall", label: "Drywall" },
    { value: "Electrical", label: "Electrical" },
    { value: "Fences/Decks", label: "Fences/Decks" },
    { value: "Plumbing", label: "Plumbing" },
    { value: "Turn", label: "Turn" },
  ];

  const handleChange = (value) => {
    setType(value.value);
  };

  return (
    <div className="w-full h-full">
      <Select
        className="focus:ring-indigo-500 shadow-md focus:border-indigo-500 block text-xl sm:text-sm text-gray-800 border-white rounded-md bg-white"
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
        options={typeOptions}
        onChange={handleChange}
        placeholder="Select a Project Type"
        instanceId={"anythingCanGoHereClearsPropsIdError"}
      />
    </div>
  );
}
