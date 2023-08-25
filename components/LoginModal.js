import { URL } from "@/config";
import { login } from "@/redux/features/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./LoadingSpinner";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/v1/users/login`, {
        email,
        password,
      });
      dispatch(login({ ...data.user, token: data.token }));
      console.log("---- data --- ", data);
      toast.success("Logged In", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setPassword("");
      onClose("login");
    } catch (error) {
      console.log("Error", error, error?.response?.data?.message);
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
      className={`${
        isOpen
          ? "fixed h-screen z-50 bg-black/20 inset-0 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <form
        onSubmit={handleLogin}
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative rounded-lg w-[90%] max-w-[500px] md:p-6 p-4"
      >
        <div
          onClick={() => {
            onClose("login");
            setEmail("");
            setPassword("");
          }}
          role="button"
          className="absolute cursor-pointer right-4 top-4"
        >
          <IoMdClose className="md:text-4xl sm:text-3xl text-2xl" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-3  sm:py-2 py-1.5 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-3 sm:py-2 py-1.5 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-[#48AFFF] max-h-10 text-white rounded-lg px-4 py-2 w-full flex space-x-4 justify-center items-center"
          disabled={loading}
        >
          Login {loading && <Loading />}
        </button>
        <p
          role="link"
          onClick={() => {
            router.push("/forgetpassword");
            onClose("login");
            setEmail("");
            setPassword("");
          }}
          className="text-blue-500 mt-6 cursor-pointer"
        >
          Forget Password?
        </p>
      </form>
    </div>
  );
};

export default LoginModal;
