"use client";
import { login, logout } from "@/redux/features/authSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { URL } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfilePlaceHolder from "./ProfilePlaceHolder";
import {
  addData,
  finishLoading,
  startLoading,
} from "@/redux/features/addCollection";
import { CancelToken } from "axios";
import { paginate, resetPagination } from "@/redux/features/paginationSlice";
import UserModel from "./UserModel";
import { onSearchChange } from "@/redux/features/searchSlice";
import { onModelToggle } from "@/redux/features/modelSlice";
import { revalidateTag } from "next/cache";
import { usePathname } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [userModel, setUserModel] = useState(false);
  const pathname = usePathname();
  const user = useSelector((state) => state.authReducer);
  const page = useSelector((state) => state.paginationReducer.page);
  const LIMIT = 5;
  const dispatch = useDispatch();
  const modelName = useSelector((state) => state.modelReducer);
  const [pageBuilding, setPageBuilding] = useState(true);
  const router = useRouter();
  let cancel;

  const handleOpenModal = (name) => {
    if (name === "login") {
      dispatch(onModelToggle("login"));
    } else if (name === "user") {
      dispatch(onModelToggle("user"));
    } else if (name === "register") {
      dispatch(onModelToggle("register"));
    }
  };

  useEffect(() => {
    if (modelName === "login") {
      setLoginModal(true);
    } else if (modelName === "user") {
      setUserModel(true);
    } else if (modelName === "register") {
      setRegisterModal(true);
    }
  }, [modelName]);

  const handleCloseModal = (name) => {
    if (name === "login") {
      setLoginModal(false);
    } else if (name === "user") {
      setUserModel(false);
    } else {
      setRegisterModal(false);
    }
    dispatch(onModelToggle(""));
  };

  useEffect(() => {
    setPageBuilding(false);
    const user = localStorage.getItem("auth");
    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(login(parsedUser));
    }
  }, []);

  const fetchData = async () => {
    if (cancel) {
      cancel(); // Cancel the previous request
    }

    try {
      dispatch(startLoading());

      const controller = new AbortController();
      const signal = controller.signal;

      const response = await fetch(
        `${URL}/api/v1/ads?page=${page}&limit=${LIMIT}&searchTerm=${search}`,
        {
          method: "GET",
          signal,
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(addData(data));
    } catch (error) {
      if (error.name === "AbortError") {
      } else {
      }
    } finally {
      dispatch(finishLoading());
    }
  };

  const onSearch = (e) => {
    dispatch(resetPagination(1));
    setSearch(e.target.value);
    dispatch(onSearchChange(e.target.value));
  };

  useEffect(() => {
    if (pathname === "/") {
      fetchData();
    }
  }, [page, search, pathname]);

  return (
    <>
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
      <LoginModal isOpen={loginModal} onClose={handleCloseModal} />
      <RegisterModal isOpen={registerModal} onClose={handleCloseModal} />
      <UserModel isOpen={userModel} onClose={handleCloseModal} />
      <header className="lg:pr-10 md:pr-3 lg:ps-0 md:-ms-3  flex w-full drop-shadow-lg items-center z-10 justify-between h-[65px] text-[#48AFFF] bg-white ">
        {/* <h1 className="text-white font-bold text-[32px] flex-1">JiJi</h1> */}
        <div className="flex-1 flex ">
          <Link
            className="relative h-[120px] w-[150px] sm:w-[200px] lg:w-[250px] md:w-[200px]"
            href="/"
          >
            <Image className=" object-contain" src={"/logo.png"} fill />
          </Link>
          <div className="flex-1 " />
        </div>
        <Image
          className="hidden md:inline-flex"
          width={40}
          height={40}
          src="https://www.mtctutorials.com/wp-content/uploads/2019/03/Nigeria-Flag-png-by-mtc-tutorials.png"
        />
        {pathname === "/" && (
          <div className="md:ml-4 flex-1 hidden md:flex  items-center border border-[#48AFFF] bg-white h-[38px] rounded-md w-[300px] px-3">
            <input
              className=" outline-none text-gray-600 border-none text-sm flex-1 w-full"
              placeholder="Enter Keywords"
              value={search}
              onChange={onSearch}
            />
            <button>
              <BiSearch color="#48AFFF" size={22} />
            </button>
          </div>
        )}
        {pageBuilding ? (
          <div className="flex  flex-1 items-center justify-end md:gap-4 gap-3 mr-2">
            <ProfilePlaceHolder button={true} />
            <ProfilePlaceHolder />
          </div>
        ) : user?.token ? (
          <div className="flex  flex-1 items-center justify-end md:space-x-6 sm:space-x-4 space-x-3">
            <Link href={user?.active ? "/sell" : `/otp/?email=${user?.email}`}>
              <button className="bg-[#48AFFF]  sm:text-sm text-[12px]  text-white lg:px-6 md:px-4 sm:px-3 px-2.5  lg:py-2.5 md:py-2 py-1  rounded-md">
                POST ADS
              </button>
            </Link>
            <Image
              onClick={() => router.push("/dashboard")}
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              src={`${URL}/images/users/${user?.photo}?${Math.random()}`}
            />

            <div></div>
          </div>
        ) : (
          <div className="flex  flex-1 items-center justify-end lg:space-x-6 md:space-x-4 sm:space-x-3 space-x-2 sm:mr-3 mr-1">
            <button
              onClick={() => handleOpenModal("login")}
              className=" border border-[#48AFFF]  text-sm whitespace-nowrap  lg:px-6 md:px-4 sm:px-3 px-2.5  lg:py-2.5 md:py-2 py-1  rounded-md"
            >
              Log In
            </button>
            <button
              onClick={() => handleOpenModal("register")}
              className=" border border-[#48AFFF] text-sm whitespace-nowrap   lg:px-6 md:px-4 sm:px-3 px-2.5  lg:py-2.5 md:py-2 py-1  rounded-md"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>
    </>
  );
}
