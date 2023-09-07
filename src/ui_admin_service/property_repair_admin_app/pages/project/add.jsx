import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@features/auth/authSlice";
import { Button, Loader, Message } from "@components/ui/common";
import { useRouter } from "next/router";

export default function Add() {
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
    description: "",
  };

  const [formData, setFormData] = useState(defaultState);

  const {
    tech_id,
    address,
    city,
    state,
    zip_code,
    type,
    tenant_name,
    tenant_phone,
    pm_name,
    pm_phone,
    description,
  } = formData;

  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, message } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    e.preventDefault();

    const userData = {
      tech_id,
      address,
      city,
      state,
      zip_code,
      type,
      tenant_name,
      tenant_phone,
      pm_name,
      pm_phone,
      description,
    };

    dispatch(login(userData))
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
        <div className="flex flex-col items-center py-12 pt-28">
          <h1 className="py-4 text-3xl font-header">Register</h1>
          <p className="py-4 text-xl font-bold tracking-widest text-white">
            Welcome to Property Repair
          </p>
          {/* <div className="w-1/3 pt-2">
            <Message type="danger">{message}</Message>
          </div> */}
        </div>

        <div className="flex flex-col items-center">
          <div>
            <input
              type="text"
              id="tech_id"
              value={tech_id}
              name="tech_id"
              onChange={onChange}
              placeholder="Tech ID"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="type"
              value={type}
              name="type"
              onChange={onChange}
              placeholder="Type"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              id="description"
              value={description}
              name="description"
              onChange={onChange}
              placeholder="Description"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
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
