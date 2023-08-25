import React, { useState } from "react";
import axios from "axios";
import { URL } from "@/config";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { register } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import Loading from "./LoadingSpinner";
import { IoMdClose } from "react-icons/io";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const RegisterModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!lastName || !lastName || !email || !passwordConfirm || !password) {
      return toast.error("All feilds are required.", {
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
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address", {
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
    if (password?.length <= 8) {
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
    if (password !== passwordConfirm) {
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
      const { data } = await axios.post(`${URL}/api/v1/users/signup`, {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      });
      console.log("Data ----", data);
      console.log(firstName, lastName, data.token, data.user.photo, email);
      dispatch(
        register({
          firstName,
          lastName,
          token: data.token,
          photo: data.user.photo,
          email,
        })
      );
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
      router.push(`/otp?email=${email}`);
      onCloseModel();
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        error?.response?.data?.message ||
          (error.response.status == 429 && error.response.data),
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
    } finally {
      setLoading(false);
    }
  };

  const onCloseModel = () => {
    onClose("register");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <div
      // onClick={onCloseModel}
      className={`${
        isOpen
          ? "fixed h-screen z-50 bg-black/20 inset-0 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <form
        onSubmit={handleRegister}
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative rounded-lg w-[90%] max-w-[500px] md:p-6 p-4"
      >
        <div
          onClick={onCloseModel}
          role="button"
          className="absolute cursor-pointer right-4 top-4"
        >
          <IoMdClose className="md:text-4xl sm:text-3xl text-2xl" />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-gray-300 rounded-lg px-3 sm:py-2 py-1.5 mb-4"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-gray-300 rounded-lg px-3 sm:py-2 py-1.5 mb-4"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-3 sm:py-2 py-1.5 mb-4"
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-lg px-3 sm:py-2 py-1.5 mb-4"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          className="bg-[#48AFFF] disabled:opacity-70 max-h-10 text-white rounded-lg px-4 sm:py-2 py-1.5 w-full flex space-x-4 justify-center items-center"
          disabled={loading}
        >
          Register {loading && <Loading />}
        </button>
      </form>
    </div>
  );
};

export default RegisterModal;
