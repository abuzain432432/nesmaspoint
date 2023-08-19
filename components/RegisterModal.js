import React, { useState } from "react";
import axios from "axios";
import { URL } from "@/config";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { register } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import Loading from "./LoadingSpinner";

const RegisterModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/v1/users/signup`, {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      });
      console.log("Data ----", data);
      dispatch(register({ firstName, lastName, email }));
      toast.success(
        "Account Created, Please Check Your Email to activate Your account!",
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
      onCloseModel()
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
      console.log("******", err);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModel = () => {
    onClose("register")
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
 
  }

  return (
    <div
      onClick={onCloseModel}
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button
          className="bg-[#48AFFF] disabled:opacity-70 max-h-10 text-white rounded-lg px-4 py-2 w-full flex space-x-4 justify-center items-center"
          onClick={handleRegister}
          disabled={loading}
        >
          Register {loading && <Loading />}
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
