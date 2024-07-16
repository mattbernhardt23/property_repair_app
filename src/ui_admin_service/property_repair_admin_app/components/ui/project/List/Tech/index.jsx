import Select from "react-select";

export default function TechList({ setSelctedUser, users }) {
  const userOptions =
    users &&
    users.map((user) => ({
      value: user.id,
      label: `${user.first_name} ${user.last_name}`,
    }));

  const handleChange = (value) => {
    setSelctedUser(value.value);
  };

  return (
    <div className="w-full h-full">
      <Select
        className="focus:ring-indigo-500 shadow-md focus:border-indigo-500 block text-xl sm:text-sm text-gray-800 border-white rounded-md bg-white"
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
        options={userOptions}
        onChange={handleChange}
        placeholder="Select a Tech"
        instanceId={"anythingCanGoHereClearsPropsIdError"}
      />
    </div>
  );
}
