"use client";
import React, { useState } from "react";
import sidebarData from "@/Data/sidebarData";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const [active, setActive] = useState(null);
  console.log("Active", active);
  return (
    <div>
      <div className="group relative  w-[350px]  bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="h-[600px] overflow-scroll">
          {sidebarData.map(item => (
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
        <div className="hidden h-[600px] overflow-scroll group-hover:block bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px_0px] absolute left-[348px] top-0 bottom-0 z-20 w-[350px]  ">
          {active?.subCategories?.map(sub => (
            <Link
              href={`/category?category=${active?.title}&subCategory=${sub.title}`}
              key={sub.title}
              className="flex items-center space-x-3 hover:bg-sky-100/70 px-3 py-2.5 border-b "
            >
              {/* <Image
                alt={sub.title || "image"}
                src={sub.image}
                width="30"
                height="30"
              /> */}
              <div className="flex flex-col">
                <span className="text-[15px] leading-5 text-gray-600">
                  {sub.title}
                </span>
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
