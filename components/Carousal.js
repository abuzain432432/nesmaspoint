import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";
import { URL } from "@/config";

export default function Carousal({ images }) {
  const leftArrow = (onClickHandler, hasPrev) =>
    hasPrev && (
      <div
        onClick={onClickHandler}
        className="absolute top-[calc(50%-12px)] left-3 z-20 cursor-pointer"
      >
        <FiChevronLeft color="white" size={50} />
      </div>
    );

  const rightArrow = (onClickHandler, hasNext) =>
    hasNext && (
      <div
        onClick={onClickHandler}
        className="absolute top-[calc(50%-12px)] right-3 z-20 cursor-pointer"
      >
        <FiChevronRight color="white" size={50} />
      </div>
    );
  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      renderArrowNext={rightArrow}
      renderArrowPrev={leftArrow}
    >
      {images.map((item, index) => (
        <div
          key={index}
          className="w-full rounded-lg overflow-hidden  relative md:h-[600px] h-[350px]"
        >
          <div className="flex items-center bg-black/50 px-2 py-1.5 rounded-md  absolute  bottom-4 left-4 z-20">
            <BsFillCameraFill size={17} color="white" />
            <span className="flex text-sm text-white ml-2">{`${index + 1} / ${
              images.length
            }`}</span>
          </div>
          <Image
            src={`${URL}/images/ads/${item}`}
            alt="carousel-image"
            className="object-cover"
            fill={true}
          />
        </div>
      ))}
    </Carousel>
  );
}
