"use client";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "@/config";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { activate, auth } from "@/redux/features/authSlice";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/LoadingSpinner";
export default function Page() {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleResendOtp = async () => {
    const email = searchParams.get("email");
    if (!email) {
      return;
    }
    try {
      const { data } = await axios.post(`${URL}/api/v1/users/resendsignupotp`, {
        email,
      });
      console.log(data.message);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong please contact to our support team",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };
  const sentOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
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
      console.log(data);
      const userData = localStorage.getItem("auth");
      dispatch(activate({ ...JSON.parse(userData), active: true }));
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[calc(100vh-300px)]   mt-[250px] text-center">
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
      <form
        onSubmit={sentOtp}
        className="flex flex-col items-center mx-auto max-w-[600px] px-6 py-6  rounded-lg "
      >
        <div>
          <h2 className="text-2xl whitespace-nowrap text-center mb-1 font-medium text-gray-700">
            Please enter the ONE-TIME Password(otp) to verify your account
          </h2>
          <h3 className="text-base whitespace-nowrap text-center mb-6 font-medium text-gray-600">
            <span>We have sent an OTP to your email</span>
            <span className="ms-2 text-gray-700">
              {searchParams.get("email")}
            </span>
          </h3>
        </div>
        <input
          type="text"
          placeholder="Enter Otp"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div>
          <button
            className={`flex items-center text-white rounded-lg justify-center  w-full px-12 ${
              loading
                ? "bg-blue-300 pointer-events-none py-1"
                : "bg-[#48AFFF]  py-3"
            }`}
          >
            Validate
            {loading && <Loading />}
          </button>
          <p
            role="button"
            onClick={handleResendOtp}
            className="text-gray-800 text-base mt-4"
          >
            Resend One-Time Password
          </p>
        </div>
      </form>
    </div>
  );
}
