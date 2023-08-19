import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";

export default function HomeBanner() {
  return (
    <div className="flex  rounded-md space-x-6">
      <div className="flex items-center flex-1  bg-white rounded-md  text-[#48AFFF] text-[38px] font-bold justify-between">
        <div className="px-8 py-8">
          <h3 className="leading-[44px] m-0 p-0">How to buy</h3>
          <h3 className="leading-[44px] m-0 p-0">on JiJi</h3>
          <Link href="/">
            <button className="text-black text-[18px] font-semibold underline">
              Click here
            </button>
          </Link>
        </div>
        <Image src="/homeBannerAsset1.png" width="230" height="230" />
      </div>
      <div className="bg-[#fea03c] w-[225px] rounded-md flex flex-col justify-between items-center p-4">
        <h4 className="text-center text-white font-bold text-[22px] leading-[30px]">
          Got something to sell?
        </h4>
        <div className="bg-white rounded-full p-4">
          <BsPlusLg size={52} style={{ strokeWidth: 2 }} color="#fea03c" />
        </div>
        <span className="text-[16px] bold-light text-white">
          Post an advert for free!
        </span>
      </div>
    </div>
  );
}
