import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addProject, reset } from "@features/projects/projectSlice";
import { Button, Loader } from "@components/ui/common";
import { TechList, TypeList, StatusList } from "@components/ui/project";
import { useRouter } from "next/router";

const defaultState = {
  tech_id: "",
  address: "",
  city: "",
  state: "",
  zip_code: "",
  type: "",
  tenant_name: "",
  tenant_phone: "",
  pm_name: "",
  pm_phone: "",
  instruction: "",
};

export default function Add() {
  const [formData, setFormData] = useState(defaultState);
  const [selectedUser, setSelctedUser] = useState();
  const [type, setType] = useState();
  const [status, setStatus] = useState();

  const { users } = useSelector((state) => state.auth);

  const {
    address,
    city,
    state,
    zip_code,
    tenant_name,
    tenant_phone,
    company,
    pm_name,
    pm_phone,
    instructions,
    notes,
    wo,
  } = formData;

  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    e.preventDefault();

    const projectData = {
      tech_id: selectedUser,
      address,
      city,
      state,
      zip_code,
      type,
      status,
      tenant_name,
      tenant_phone,
      company,
      pm_name,
      pm_phone,
      instructions,
      notes,
      wo,
    };

    dispatch(addProject(projectData))
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch(toast.error);
    setFormData(defaultState);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section>
        <div className="flex flex-col items-center py-12">
          <h1 className="py-4 text-3xl font-header">New Project</h1>
          <p className="py-4 text-xl font-bold tracking-widest text-white">
            Welcome to Property Repair
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-96 py-2">
            <TechList setSelctedUser={setSelctedUser} users={users} />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="address"
              value={address}
              name="address"
              onChange={onChange}
              placeholder="Address"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="city"
              value={city}
              name="city"
              onChange={onChange}
              placeholder="City"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="state"
              value={state}
              name="state"
              onChange={onChange}
              placeholder="State"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="zip_code"
              value={zip_code}
              name="zip_code"
              onChange={onChange}
              placeholder="Zip Code"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="w-96 py-2">
            <TypeList setType={setType} />
          </div>
          <div className="w-96 py-4">
            <StatusList setStatus={setStatus} />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="tenant_name"
              value={tenant_name}
              name="tenant_name"
              onChange={onChange}
              placeholder="Tenant Name"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="tenant_phone"
              value={tenant_phone}
              name="tenant_phone"
              onChange={onChange}
              placeholder="Tenant Phone"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="company"
              value={company}
              name="company"
              onChange={onChange}
              placeholder="Company"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="pm_name"
              value={pm_name}
              name="pm_name"
              onChange={onChange}
              placeholder="PM Name"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="pm_phone"
              value={pm_phone}
              name="pm_phone"
              onChange={onChange}
              placeholder="PM Phone"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="wo"
              value={wo}
              name="wo"
              onChange={onChange}
              placeholder="Work Order Number"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <textarea
              type="text"
              id="instructions"
              value={instructions}
              name="instructions"
              onChange={onChange}
              placeholder="Instructions"
              required
              className="w-96 h-32 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <textarea
              type="text"
              id="notes"
              value={notes}
              name="notes"
              onChange={onChange}
              placeholder="Notes"
              required
              className="w-96 h-32 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-2 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
        </div>

        <div className="my-8">
          <div className="flex justify-center mb-8">
            <Button variant="white" onClick={onClick}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
