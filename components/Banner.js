import Image from "next/image";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

export default function Banner() {
  return (
    <div className="bg-[#48AFFF] h-[320px] flex space-x-10 items-end justify-between px-20">
      <Image
        className="object-contain"
        width={200}
        height={120}
        src="https://www.transparentpng.com/thumb/happy-person/VJdvLa-download-happy-blackman-png.png"
      />
      <div className="flex-1 h-full pt-10  flex flex-col justify-evenly ">
        <p className="text-white text-lg flex items-center justify-center ">
          Find Anything in{" "}
          <button className="ml-2.5 bg-black text-sm rounded-md flex items-center px-2 py-1.5 ">
            <MdLocationOn size={18} className="mr-1" />
            {` All Nigeria`}
          </button>
        </p>
        <div className="flex items-center bg-white h-[45px] rounded-md w-full px-5">
          <input
            className="flex-1 outline-none border-none "
            placeholder="I am looking for..."
          />
          <button>
            <BiSearch color="#48AFFF" size={24} />
          </button>
        </div>
      </div>
      <Image
        className="object-contain"
        width={300}
        height={200}
        src="https://cms.jibecdn.com/prod/pepsico-main/assets/LP-D4-2.IMG-1-en-us-1522248205847.png"
      />
    </div>
  );
}
