"use client";
import { URL } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function AdsCard({ ad, userAdd = false, onAdDelete }) {
  const router = useRouter();
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
      <div className="bg-white px-1.5 pb-1.5 pt-4 relative flex justify-between items-center">
        {/* <button className="bg-white absolute right-1 -top-4 p-1.5 rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <AiOutlineHeart color="#48AFFF" size={20} />
        </button> */}
        <div>
          <p className="text-sm line-clamp-1">{ad.title}</p>
          <span className="text-[#48AFFF] text-[14px]">NGN {ad.price}</span>
        </div>
        {userAdd && (
          <div>
            <button
              onClick={() => onAdDelete(ad._id)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
