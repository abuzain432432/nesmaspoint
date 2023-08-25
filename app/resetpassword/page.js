"use client";
import { useState } from "react";
import { URL } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import OtpTime from "@/components/OtpTime";
function page() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      return toast.error("Invalid input .All fields are requried", {
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
    if (newPassword?.length <= 8) {
      return toast.error("Please enter strong password", {
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
    if (newPassword !== confirmPassword) {
      return toast.error("Password and confirm password must be same", {
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
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${URL}/api/v1/users/resetpassword/${otp}`,
        {
          password: newPassword,
          passwordConfirm: confirmPassword,
        }
      );
      router.replace("/");
      toast.success(data?.message, {
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
      toast.error(err?.response?.data?.message, {
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
  const handleResetResetPassOtp = async () => {
    try {
      const searchEmail = searchParams.get("email");

      if (!searchEmail) {
        return;
      }
      const { data } = await axios.post(
        `${URL}/api/v1/users/resendpassresetotp`,
        {
          email: searchEmail,
        }
      );
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    }
  };

  return (
    <div className="md:px-12 px-2.5 py-10 mb-4  h-[calc(100vh-65px)]  flex flex-col justify-center">
      <form
        className="md:w-[550px] sm:w-[500px] w-full sm:px-0 px-4 mx-auto"
        onSubmit={handleForgetPassword}
      >
        <h2 className="text-2xl w-full font-semibold mb-4 ">Reset Password</h2>
        <input
          type="text"
          placeholder="Enter Otp"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="w-full">
          <button
            disabled={loading}
            type="submit"
            className={`px-10 flex items-center  rounded-lg   text-white ${
              loading
                ? "bg-blue-300 pointer-events-none "
                : "bg-blue-500 py-[6px]"
            }`}
          >
            <span>Reset</span>
            {loading && <Loading />}
          </button>
          <OtpTime onTimeComplete={handleResetResetPassOtp} />
          {/* <p
            onClick={handleResetResetPassOtp}
            className="text-center mt-2 "
            typeof="button"
            role="button"
          >
            Resend OTP
          </p> */}
        </div>
      </form>
    </div>
  );
}

export default page;
