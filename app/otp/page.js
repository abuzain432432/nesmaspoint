"use client";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "@/config";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { activate } from "@/redux/features/authSlice";

export default function Page() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const sentOtp = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/activate/${otp}`);
      if (data.status === "success") {
        toast.success("Account Activated Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      dispatch(activate(data.token));
      router.back();
      console.log("---- data", data);
    } catch (err) {
      toast.error("Invalid Otp", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log("error", err);
    }
  };
  return (
    <div className="h-[calc(100vh-300px)] max-w-[550px] mx-auto mt-[250px] text-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h6 className="text-lg my-4 font-medium text-gray-600">
        We have sent you an otp on your email. Please Enter your here
      </h6>
      <input
        type="text"
        placeholder="Enter Otp"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-[#48AFFF] text-white rounded-lg px-4 py-2 w-full"
        onClick={sentOtp}
      >
        Register
      </button>
    </div>
  );
}
