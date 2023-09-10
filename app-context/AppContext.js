"use client";
import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { URL } from "@/config";
import { login } from "@/redux/features/authSlice";

export const AppCtx = createContext({
  appLoading: null,
  setAppLoading: () => {},
});
export default function AppCtxProvider({ children }) {
  const [appLoading, setAppLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem("auth");
      if (user) {
        const parsedUser = JSON.parse(user);

        const requestHeaders = {
          Authorization: `Bearer ${parsedUser?.token}`,
          "Content-Type": "application/json",
        };
        try {
          const { data } = await axios.get(`${URL}/api/v1/users/me`, {
            headers: requestHeaders,
          });
          console.log(parsedUser, "parsedUser");
          console.log(parsedUser?.token, "parsedUserToken");
          console.log(data, "Response data");

          dispatch(login({ ...data?.data[0], token: parsedUser?.token }));
        } catch (err) {
          console.log(err);
          router.push("/");
        }
      }
      setAppLoading(false);
    };
    fetchUserData();
  }, []);

  const appCtxValue = {
    appLoading,
  };
  return <AppCtx.Provider value={appCtxValue}>{children}</AppCtx.Provider>;
}
