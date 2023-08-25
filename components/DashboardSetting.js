"use client";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login } from "@/redux/features/authSlice";
import Loading from "./LoadingSpinner";

import Image from "next/image";
import { toast } from "react-toastify";

import { URL as baseURL } from "@/config";
const validImageFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
function DashboardSetting() {
  const user = useSelector((state) => state.authReducer);
  const userImage = `${baseURL}/images/users/${user?.photo}`;
  const [images, setImages] = useState({
    url: userImage,
  });
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [email] = useState(user?.email);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const [isAccountSettingLoading, seIsAccountSettingLoading] = useState(false);
  let isChanged = false;
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const imageRef = useRef();
  const onImageChange = (e) => {
    setIsPhotoSelected(true);
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }
    if (!validImageFormats.includes(selectedFile.type)) {
      setImageError(true);
      return;
    }
    setImages({
      url: URL.createObjectURL(selectedFile),
      file: selectedFile,
    });
    setImageError(false);
  };

  if (
    firstName !== user?.firstName ||
    lastName !== user?.lastName ||
    isPhotoSelected
  ) {
    isChanged = true;
  }
  const handleSettingForm = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      return toast.error("First name and Last name must be filled", {
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

    const formData = new FormData();
    if (user?.lastName !== lastName) formData.append("lastName", lastName);
    if (user?.firstName !== firstName) formData.append("firstName", firstName);
    if (images?.file) formData.append("photo", images?.file);

    const requestHeaders = {
      Authorization: `Bearer ${user.token}`,
    };
    seIsAccountSettingLoading(true);
    try {
      console.log(user?.lastName !== lastName);
      const { data } = await axios.patch(
        `${baseURL}/api/v1/users/me`,
        formData,
        {
          headers: requestHeaders,
        }
      );
      dispatch(login({ ...data.data, token: user.token }));
      setFirstName(data.data?.firstName);
      setLastName(data.data.lastName);
      setIsPhotoSelected(false);
      toast.success("Account details updated successfully ", {
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
      toast.error(err?.response?.data?.message || "Something went wrong", {
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
      seIsAccountSettingLoading(false);
    }
  };
  const handleChangePasswordForm = async (e) => {
    e.preventDefault();
    if (isPasswordChanging) {
      return;
    }
    if (!currentPassword || !confirmPassword || !newPassword) {
      return toast.error(
        "Current Password,New Password & Confirm Password must be filled",
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
    if (confirmPassword !== newPassword) {
      console.log("not same");
      return toast.error("New Password and Confirm Password must be same", {
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
    if (confirmPassword == currentPassword) {
      return toast.error(
        "New Password and Current Password must be different",
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
    try {
      setIsPasswordChanging(true);
      const requestBody = {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      };
      const requestHeaders = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };
      const { data } = await axios.patch(
        `${baseURL}/api/v1/users/updatepassword`,
        requestBody,
        { headers: requestHeaders }
      );
      dispatch(login({ ...data.user, token: data.token }));
      toast.success("Password changed successfully ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setConfirmPassword("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong please try again later",
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
      setIsPasswordChanging(false);
    }
  };
  return (
    <div className="flex-1">
      <form
        onSubmit={handleSettingForm}
        className="2xl:w-[50%] lg:w-[60%] md:w-[70%] w-[100%] md:px-0 px-4 sm:px-8 mx-auto md:my-16 sm:my-10 my-8"
      >
        <h1 className="font-semibold xl:text-2xl md:text-xl text-lg uppercase xl:mb-4 sm:mb-3 mb-2 2xl:mb-8">
          Your Account setting
        </h1>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            First name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Johan..."
            className="w-full border border-gray-300 rounded-lg px-3 py-1 xl:py-3 lg:py-2 sm:py-1.5 xl:mb-4 mb-2"
          />
        </div>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Schmedtmann..."
            className="w-full border border-gray-300 rounded-lg px-3 py-1 xl:py-3 lg:py-2 sm:py-1.5 xl:mb-4 mb-2"
          />
        </div>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            disabled
            placeholder="example@gmail.com..."
            className="w-full border border-gray-300 rounded-lg px-3 py-1 xl:py-3 lg:py-2 sm:py-1.5 xl:mb-4 mb-2"
          />
        </div>
        <div className="flex items-end mt-4 mb-2 xl:gap-6 md:gap-3  gap-2">
          <div className="relative group 2xl:w-[100px] xl:w-[80px] w-[60px]  h-[60px]  xl:h-[80px] 2xl:h-[100px] border border-gray-50">
            <Image
              className="shadow-md rounded-full w-full  h-full"
              width={35}
              height={35}
              src={images?.url}
              alt={images.url}
            />
          </div>
          <input
            onChange={onImageChange}
            ref={imageRef}
            type="file"
            className="hidden"
          />
          <div
            onClick={() => imageRef.current.click()}
            className="border-b-2 text-blue-500 xl:pb-1 pb-0.5 2xl:mb-8 xl:mb-6 md:mb-4 mb-2 sm:mb-3 text-sm xl:text-base border-blue-600 h-fit cursor-pointer flex items-center justify-center"
          >
            Change profile
          </div>
        </div>
        {imageError && <p className="text-red-300">Invalid file type</p>}
        <div className="text-right flex justify-end sm:mt-0 mt-3 items-center">
          <button
            disabled={!isChanged || isAccountSettingLoading}
            className={`uppercase xl:text-base sm:text-sm text-[12px] items-center disabled:bg-blue-300 flex bg-blue-500 text-white rounded-3xl px-8 ${
              isAccountSettingLoading ? "xl:py-1 sm:py-0.5 0" : "xl:py-3 py-2"
            }`}
          >
            <span>Save Changes</span>
            {isAccountSettingLoading && <Loading />}
          </button>
        </div>
      </form>
      <div className="h-[1px] bg-gray-300"></div>
      <form
        onSubmit={handleChangePasswordForm}
        className="2xl:w-[50%] lg:w-[60%] md:w-[70%] w-[100%] md:px-0 px-4 sm:px-8 mx-auto md:my-16 sm:my-10 my-8 "
      >
        <h1 className="font-semibold xl:text-2xl md:text-xl text-lg uppercase xl:mb-4 sm:mb-3 mb-2 2xl:mb-8">
          password change
        </h1>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            Current password
          </label>
          <input
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 xl:py-3 lg:py-2 sm:py-1.5 py-1 xl:mb-4 mb-2"
          />
        </div>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            New password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 xl:py-3 py-1 lg:py-2 sm:py-1.5 xl:mb-4 mb-2"
          />
        </div>
        <div className="mb-2">
          <label className="xl:text-lg text-base block font-semibold text-gray-500 xl:mb-1 mb-0.5">
            Confirm password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 xl:py-3 py-1 lg:py-2 sm:py-1.5 xl:mb-4 mb-2"
          />
        </div>
        <div className="flex w-full justify-end sm:mt-4 mt-3">
          <button
            disabled={
              isPasswordChanging ||
              !currentPassword ||
              !confirmPassword ||
              !newPassword
            }
            className={`uppercase xl:text-base sm:text-sm text-[12px] flex items-center disabled:bg-blue-300 text-white rounded-3xl px-8  ${
              isPasswordChanging
                ? "xl:py-1 sm:py-0.5  py-0 rounded-full bg-blue-300"
                : "xl:py-3 py-2 bg-blue-500"
            }`}
          >
            <span>Change Password</span>
            {isPasswordChanging && <Loading />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DashboardSetting;
