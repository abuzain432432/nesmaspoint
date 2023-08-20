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
    if (user?.lastName !== lastName) formData.append("firstName", firstName);
    if (user?.firstName !== firstName) formData.append("lastName", lastName);
    if (images?.file) formData.append("photo", images?.file);

    const requestHeaders = {
      Authorization: `Bearer ${user.token}`,
    };
    seIsAccountSettingLoading(true);
    try {
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
      const { data } = await axios.post(
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
      <form onSubmit={handleSettingForm} className="w-[50%] mx-auto my-16  ">
        <h1 className="font-semibold text-2xl uppercase mb-8">
          Your Account setting
        </h1>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            First name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Johan..."
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Schmedtmann..."
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={email}
            disabled
            placeholder="example@gmail.com..."
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="flex items-end mt-4 mb-2 gap-6">
          <div className="relative group w-[100px] h-[100px] border border-gray-50">
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
            className="border-b-2 text-blue-500 pb-1 mb-8 border-blue-600 h-fit cursor-pointer flex items-center justify-center"
          >
            Change profile
          </div>
        </div>
        {imageError && <p className="text-red-300">Invalid file type</p>}
        <div className="text-right flex justify-end items-center">
          <button
            disabled={!isChanged || isAccountSettingLoading}
            className={`uppercase items-center disabled:bg-blue-300 flex bg-blue-500 text-white rounded-3xl px-8 ${
              isAccountSettingLoading ? "py-1" : "py-3"
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
        className="w-[50%] mx-auto my-16  "
      >
        <h1 className="font-semibold text-2xl uppercase mb-8">
          password change
        </h1>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            Current password
          </label>
          <input
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            New password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="mb-2">
          <label className="text-lg block font-semibold text-gray-500 mb-1">
            Confirm password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="**********"
            className="w-full border border-gray-300 rounded-lg px-3 py-3 mb-4"
          />
        </div>
        <div className="flex w-full justify-end mt-4">
          <button
            disabled={
              isPasswordChanging ||
              !currentPassword ||
              !confirmPassword ||
              !newPassword
            }
            className={`uppercase flex items-center disabled:bg-blue-300 text-white rounded-3xl px-8  ${
              isPasswordChanging
                ? "py-1 rounded-full bg-blue-300"
                : "py-3 bg-blue-500"
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
