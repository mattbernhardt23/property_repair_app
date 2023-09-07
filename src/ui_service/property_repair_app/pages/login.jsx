import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@features/auth/authSlice";
import { Button, Loader, Message } from "@components/ui/common";
import { useRouter } from "next/router";

export default function Login() {
  const defaultState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultState);

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then(() => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        //   toast.success(`Logged in as ${user.name}`)
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
          <h1 className="py-4 text-3xl font-bold tracking-widest text-gray-700">
            Login
          </h1>
          <p className="py-4 text-xl font-bold tracking-widest text-red-500">
            Please Login
          </p>
          <div className="w-1/3">
            <Message type="danger">{message}</Message>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center">
          <form>
            <div className="border-black">
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
            <div className="my-8">
              <input
                type="text"
                id="password"
                value={password}
                name="password"
                onChange={onChange}
                placeholder="Enter Your Password"
                required
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 text-xl block pl-7 p-4 sm:text-sm border-gray-700 rounded-md"
              />
            </div>
            <div className="flex justify-center mb-8">
              <Button variant="lightGray" onClick={onClick}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
