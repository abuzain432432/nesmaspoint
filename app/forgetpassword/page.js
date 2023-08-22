"use client";
import { useState } from "react";
import { URL } from "@/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FlagFilled } from "@ant-design/icons";
import Loading from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

function page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}/api/v1/users/forgotpassword/`, {
        email,
      });

      router.replace(`/resetpassword?email=${email}`);
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
  return (
    <div className="md:px-12 px-2.5 py-10 mb-4  h-[calc(100vh-300px)]  flex flex-col justify-center">
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
      <form className="w-[550px] mx-auto" onSubmit={handleForgetPassword}>
        <h2 className="text-2xl w-full font-semibold mb-4 ">
          Enter your email address
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={loading}
          className={`px-10 flex items-center rounded-lg   text-white ${
            loading
              ? "bg-blue-300 pointer-events-none "
              : "bg-blue-500 py-[6px]"
          }`}
        >
          <span>Send</span>
          {loading && <Loading />}
        </button>
      </form>
    </div>
  );
}

export default page;
