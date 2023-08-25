import React, { useState } from "react";
import axios from "axios";
import { URL } from "@/config";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout, register } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import Loading from "./LoadingSpinner";
import { useSelector } from "react-redux";
import Image from "next/image";
// import { useRouter } from "next/navigation";

const UserModel = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.authReducer);
  const router = useRouter();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/v1/users/signup`, {});

      // dispatch(register({ firstName, lastName, email }));
      //   toast.success(
      //     "Account Created, Please Check Your Email to activate Your account!",
      //     {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     }
      //   );

      onClose("user");
      router.push("/otp");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => onClose("user")}
      className={`${
        isOpen
          ? "fixed h-screen z-50 bg-black/20 inset-0 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white  rounded-lg w-[500px] p-6 flex flex-col space-y-3"
      >
        <Image
          width={100}
          height={100}
          className="rounded-full  self-center"
          src={`${URL}/images/users/${user?.photo}`}
        />
        <h2 className="text-2xl font-semibold mb-4 text-center">User Model</h2>
        <div className="border bg-gray-50 rounded-md px-3 py-2">
          {user.firstName} {user.lastName}
        </div>
        <div className="border bg-gray-50 rounded-md px-3 py-2">
          {user.email}
        </div>
        <button
          onClick={() => {
            dispatch(logout());
            onClose("user");
            router.replace("/");
          }}
          className="bg-[#48AFFF] ml-auto text-white font-medium px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserModel;
