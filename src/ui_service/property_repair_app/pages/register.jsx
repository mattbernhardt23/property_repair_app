import { useState, useEffect } from "react";
import { Button, Loader, Message } from "@components/ui/common";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "@features/auth/authSlice";
import { useRouter } from "next/router";

export default function Register() {
  const defaultState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState(defaultState);

  const {
    first_name,
    last_name,
    phone_number,
    street_address,
    city,
    state,
    zip_code,
    email,
    password,
    confirm_password,
  } = formData;

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //     if(isError) {
  //         toast.error(message)
  //     }

  //     if(isSuccess || user){
  //         navigate('/')
  //     }

  //     dispatch(reset())
  // }, [user, isLoading, isError, isSuccess, message])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords Do Not Match");
    } else {
      const userData = {
        first_name,
        last_name,
        phone_number,
        street_address,
        city,
        state,
        zip_code,
        email,
        password,
      };

      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          toast.success(`Logged in as ${user.username}`);
          router.push("/");
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section>
        <div className="flex flex-col items-center py-12">
          <h1 className="py-4 text-3xl font-header">Register</h1>
          <p className="py-4 text-xl font-bold tracking-widest text-white">
            Welcome to Property Repair
          </p>
          <div className="w-1/3 pt-2">
            <Message type="danger">{message}</Message>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center">
          <div>
            <input
              type="text"
              id="first_name"
              value={first_name}
              name="first_name"
              onChange={onChange}
              placeholder="First Name"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm text-gray-800 border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="last_name"
              value={last_name}
              name="last_name"
              onChange={onChange}
              placeholder="Last Name"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              name="phone_number"
              onChange={onChange}
              placeholder="Cell Phone Number"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="street_address"
              value={street_address}
              name="street_address"
              onChange={onChange}
              placeholder="Street Address"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="city"
              value={city}
              name="city"
              onChange={onChange}
              placeholder="City"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="state"
              value={state}
              name="state"
              onChange={onChange}
              placeholder="State"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="zip_code"
              value={zip_code}
              name="zip_code"
              onChange={onChange}
              placeholder="Zip Code"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>

          <div className="my-4">
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter Your Email"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter Your Password"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              id="confirm_password"
              value={confirm_password}
              name="confirm_password"
              onChange={onChange}
              placeholder="Please Confirm Your Password"
              required
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
            />
          </div>
          <div className="my-8">
            <div className="flex justify-center mb-8">
              <Button variant="white" onClick={onClick}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
