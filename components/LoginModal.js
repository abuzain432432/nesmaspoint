import { URL } from "@/config";
import { login } from "@/redux/features/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./LoadingSpinner";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      onClick={() => {onClose("login");  setEmail("");
      setPassword("");}}
      className={`${
        isOpen
          ? "fixed h-screen z-50 bg-black/20 inset-0 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white  rounded-lg w-[500px] p-6"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-[#48AFFF] max-h-10 text-white rounded-lg px-4 py-2 w-full flex space-x-4 justify-center items-center"
          onClick={handleLogin}
          disabled={loading}
        >
          Login {loading && <Loading />}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
