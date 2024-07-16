import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  getUser,
  getActiveUsers,
  reset,
} from "@features/auth/authSlice";
import { Button } from "@components/ui/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const callDispatch = () => dispatch(getUser());
  const getUsers = () => dispatch(getActiveUsers());

  useEffect(() => {
    callDispatch();
    getUsers();
  }, []);

  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
  };

  return (
    <div className="flex space-x-2 mr-4 font-header text-lg">
      {user ? (
        <div onClick={onLogout} className="hover:scale-110">
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
