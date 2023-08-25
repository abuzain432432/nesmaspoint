"use client";
import React, { useState } from "react";
import sidebarData from "@/Data/sidebarData";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const [active, setActive] = useState(false);
  const sidebarDataOnMobile = active ? sidebarData : sidebarData.slice(0, 4);

  return (
    <div className="md:w-auto w-full">
      <div className="group relative  md:block hidden 2xl:w-[330px] xl:w-[300px] lg:w-[280px] md:w-[250px]  bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="h-[600px] overflow-auto ">
          {sidebarData.map((item) => (
            <Link
              href={`/category?category=${item.title}`}
              key={item.title}
              onMouseOver={() => setActive(item)}
              className="flex mb-1 cursor-pointer items-center justify-between hover:bg-sky-100/70 px-2 py-1.5 "
            >
              <div className="flex items-center space-x-3">
                <Image
                  alt={item.title || "image"}
                  src={item.image}
                  width="30"
                  height="30"
                />
                <div className="flex flex-col">
                  <span className="text-[15px] leading-5 text-gray-600">
                    {item.title}
                  </span>
                </div>
              </div>
              <FiChevronRight size={18} color="gray" />
            </Link>
          ))}
        </div>
        <div className=" 2xl:w-[350px]  xl:w-[300px] lg:w-[280px] md:w-[250px] 2xl:left-[348px] xl:left-[308px] lg:left-[290px] md:left-[260px]  hidden h-[600px] overflow-scroll group-hover:block bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px_0px] absolute  top-0 bottom-0 z-20   ">
          {active?.subCategories?.map((sub) => (
            <Link
              href={`/category?category=${active?.title}&subCategory=${sub.title}`}
              key={sub.title}
              className="flex items-center space-x-3 hover:bg-sky-100/70 px-3 py-2.5 border-b "
            >
              <div className="flex flex-col">
                <span className="text-[15px] leading-5 text-gray-600">
                  {sub.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:hidden">
        <p className="uppercase w-fit font-semibold sm:mb-3 mb-2 text-gray-400 ">
          Catagories
        </p>
        <div className=" grid sm:grid-cols-4 grid-cols-2 sm:gap-4 gap-3 ">
          {sidebarDataOnMobile.map((item) => (
            <Link
              href={`/category?category=${item.title}`}
              key={item.title}
              onMouseOver={() => setActive(item)}
              className="flex  cursor-pointer items-center justify-between hover:bg-sky-100/70 "
            >
              <div className="p-4 rounded-md bg-white w-full h-full flex flex-col justify-center items-center gap-2 sm:gap-3">
                <Image
                  alt={item.title || "image"}
                  src={item.image}
                  className="sm:w-[70px] w-[50px]"
                  width="70"
                  height="70"
                />
                <div className="flex flex-col">
                  <span className="sM:text-[15px]   text-[13px] text-center leading-4 sm:leading-5 text-gray-600">
                    {item.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="self-start -mt-3 whitespace-nowrap">
            <button
              onClick={() => setActive((preS) => !preS)}
              className="text-blue-500 text-sm  font-semibold"
            >
              Show {active ? "less" : "more"} catagories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
