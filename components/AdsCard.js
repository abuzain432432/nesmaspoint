"use client";
import { URL } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "./LoadingSpinner";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
export default function AdsCard({ ad, userAdd = false, onAdDelete }) {
  const [deleting, setDeleting] = useState(false);
  const user = useSelector((state) => state.authReducer);

  const router = useRouter();
  const handleAdDelete = async (e) => {
    e.stopPropagation();
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      const requestHeaders = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };
      await axios.delete(`${URL}/api/v1/ads/${ad._id}`, {
        headers: requestHeaders,
      });
      toast.success("Ad deleted successfully ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onAdDelete(ad._id);
    } catch (err) {
      return toast.error(
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
      setDeleting(false);
    }
  };

  return (
    <div
      onClick={() => router.push(`/details/${ad._id}`)}
      className="group rounded-md overflow-hidden cursor-pointer relative"
    >
      <div
        className={`absolute top-0 z-10 ${
          ad?.boosted ? "block" : "hidden"
        } left-0 bg-orange-500 px-2 py-1 rounded-sm overflow-hidden text-white text-sm`}
      >
        Premium
      </div>
      <div className="relative group-hover:scale-[1.25] transition-all duration-300 ease-in-out overflow-hidden h-[150px] object-cover ">
        <Image
          objectFit="cover"
          alt={ad.title || "image"}
          src={`${URL}/images/ads/${ad?.photos[0]}`}
          fill={true}
        />
      </div>
      <div className="bg-white px-1.5 pb-1.5 pt-4 relative flex justify-between items-center gap-2 flex-wrap">
        {/* <button className="bg-white absolute right-1 -top-4 p-1.5 rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <AiOutlineHeart color="#48AFFF" size={20} />
        </button> */}
        <div>
          <p className="text-sm line-clamp-1">{ad.title}</p>
          <span className="text-[#48AFFF] text-[14px]">NGN {ad.price}</span>
        </div>
        {userAdd && (
          <div
            disabled={deleting}
            onClick={handleAdDelete}
            className={`flex   text-white px-6  rounded-lg ${
              deleting ? "bg-red-300  py-0" : "bg-red-500 lg:py-2 py-1.5"
            }`}
          >
            <button className="">
              <span>Delete</span>
            </button>
            {deleting && <Loading />}
          </div>
        )}
      </div>
    </div>
  );
}
