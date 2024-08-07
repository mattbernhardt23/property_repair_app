import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, reset } from "@features/auth/authSlice";
import { getProjects } from "@features/projects/projectSlice";
import { Button } from "@components/ui/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const callDispatch = () => dispatch(getUser());
  function projectDispatch(id) {
    dispatch(getProjects(id));
  }

  useEffect(() => {
    callDispatch();
  }, []);

  useEffect(() => {
    if (user) {
      projectDispatch(user.id);
    }
  }, [user]);

  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
  };

  return (
    <div className="flex space-x-2 mr-4 font-header text-lg">
      {user ? (
        <div
          onClick={onLogout}
          className="hover:scale-110 hover:cursor-pointer"
        >
          Sign Out
        </div>
      ) : (
        <>
          <div>
            <Link href="/login" legacyBehavior className="hover:scale-110">
              <a>Sign In</a>
            </Link>
          </div>

          <div>
            <Link href="/register" legacyBehavior className="hover:scale-110">
              <a>Register</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
