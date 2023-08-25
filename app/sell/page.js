"use client";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import sidebarData from "@/Data/sidebarData";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import PlacesData from "@/Data/PlacesData";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addData } from "@/redux/features/adSlice";

const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
const validImageFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export default function Page() {
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [subCategory, setSubCategory] = useState();
  const [category, setCategory] = useState();
  const [state, setState] = useState();
  const [location, setLocation] = useState();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [openDropdown, setOpenDropDown] = useState();
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const imageRef = useRef();
  const onImageChange = (e) => {
    const selectedFiles = Object.values(e.target.files);
    const hasInvalidFile = selectedFiles.some(
      (file) => !validImageFormats.includes(file.type)
    );
    if (hasInvalidFile) {
      setImageError(true);
      return;
    }
    if (!hasInvalidFile) {
      const objectUrl = selectedFiles.map((file, index) => ({
        url: URL.createObjectURL(selectedFiles[index]),
        file,
      }));

      setImages((prevImages) => [...prevImages, ...objectUrl].slice(-5));
      setImageError(false);
    }
  };

  const onDelete = (img) => {
    const updatedImages = images.filter((image) => image !== img);
    setImages(updatedImages);
  };

  const handleCategoryClick = (e, item) => {
    e.stopPropagation();
    setOpenDropDown("subCategory");
    setCategory(item);
  };

  const handleLocationClick = (e, item) => {
    e.stopPropagation();
    setOpenDropDown("location");
    setState(item);
  };
  const handleYoutbeChange = (e) => {
    setYoutubeLink(e.target.value);
  };
  useEffect(() => {
    if (youtubeLink.trim() !== "" && !youtubeRegex.test(youtubeLink)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [youtubeLink]);

  const nextStep = () => {
    dispatch(
      addData({
        category: category.title,
        subCategory: subCategory,
        videoURL: youtubeLink,
        location,
        images,
      })
    );
    router.push("/add2");
  };

  const clearForm = () => {
    setYoutubeLink("");
    setLocation("");
    setSubCategory("");
    setImages([]);
  };

  return (
    <div className="md:px-12 px-3 sm:px-6 py-6 max-w-[950px] mx-auto md:space-y-6 space-y-6">
      {openDropdown && (
        <div
          onClick={() => {
            setOpenDropDown("");
          }}
          className="absolute inset-0 "
        />
      )}
      <div className="bg-white sm:p-4 p-3 sm:px-8 px-4 rounded-md flex items-center justify-between ">
        <h3 className="flex-1 text-center font-semibold text-slate-800 ">
          Post ad
        </h3>
        <button onClick={clearForm} className="text-sky-700">
          Clear
        </button>
      </div>
      <div className="bg-white rounded-md sm:py-4 py-6 md:px-44 sm:px-10 px-5 ">
        <div
          onClick={() => setOpenDropDown("category")}
          className="relative border border-slate-400 rounded-md md:p-3 sm:py-2 sm:px-4 px-3 py-1.5 mb-4"
        >
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="Category*"
            value={subCategory}
          />
          {/* Drop Down -------------- */}

          {openDropdown === "category" && (
            <div className="absolute z-20 md:top-14 top-11 -left-1 -right-2 h-[500px] overflow-scroll">
              <div className="bg-white border border-slate-300">
                {sidebarData.map((item) => (
                  <div
                    onClick={(e) => handleCategoryClick(e, item)}
                    className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 lg:py-4 sm:py-2 py-1.5 border-b border-slate-200"
                  >
                    <Image width={40} height={40} src={item.image} />
                    <span className="flex-1">{item.title}</span>
                    <BsChevronRight color="gray" size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {openDropdown === "subCategory" && (
            <div className="absolute z-20 md:top-14 top-11 -left-1 -right-2 h-[500px] overflow-scroll">
              <div className="bg-white border border-slate-300">
                {category.subCategories.map((item) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubCategory(item.title);
                      setOpenDropDown("");
                    }}
                    className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 lg:py-4 sm:py-2 py-1.5 border-b border-slate-200"
                  >
                    <span className="flex-1">{item.title}</span>
                    <BsChevronRight color="gray" size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => setOpenDropDown("state")}
          className="border relative border-slate-400 rounded-md md:p-3  px-3 py-1.5 sm:px-4 mb-4"
        >
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="Select Location*"
            value={location}
          />

          {openDropdown === "state" && (
            <div className="absolute z-20 md:top-14 top-10  -left-1 -right-2 h-[500px] overflow-scroll">
              <div className="bg-white border border-slate-300">
                {PlacesData.map((item) => (
                  <div
                    onClick={(e) => handleLocationClick(e, item)}
                    className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 lg:py-4 sm:py-2 py-1.5 border-b border-slate-200"
                  >
                    <span className="flex-1">{item.name}</span>
                    <BsChevronRight color="gray" size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {openDropdown === "location" && (
            <div className="absolute z-20 md:top-14 top-10 -left-1 -right-2 h-[500px] overflow-scroll">
              <div className="bg-white border border-slate-300">
                {state.cities.map((item) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(item);
                      setOpenDropDown("");
                    }}
                    className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 lg:py-4 sm:py-2 py-1.5 border-b border-slate-200"
                  >
                    <span className="flex-1">{item}</span>
                    <BsChevronRight color="gray" size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <h6 className="text-lg text-slate-700 font-medium">Add photo</h6>
        <h6 className="text-sm text-slate-600">
          Add at least 1 photo for this category
        </h6>

        <div className="grid  sm:grid-cols-4  grid-cols-3  xl:grid-cols-5 my-2 md:gap-6 gap-3">
          <input
            onChange={onImageChange}
            ref={imageRef}
            type="file"
            className="hidden"
            maxLength={5}
            multiple
          />
          <div
            onClick={() => imageRef.current.click()}
            className="bg-sky-700/20 sm:w-auto w-full md:min-h-[70px] min-h-[50px] cursor-pointer flex items-center justify-center h-full rounded-md"
          >
            <AiOutlinePlus size={24} color="#48AFFF" />
          </div>
          {images?.map((image) => (
            <div className="relative group hover:bg-black/30 hover:rounded-md border border-gray-50">
              <Image
                className="rounded-md h-full w-full shadow-md   group-hover:opacity-80"
                src={image.url}
                alt={image.url}
                width={100}
                height={100}
              />
              <IoCloseOutline
                onClick={() => onDelete(image)}
                size={24}
                className="absolute top-1 right-1 cursor-pointer sm:hidden group-hover:block bg-white opacity-80 rounded-full p-1 border border-gray-400"
              />
            </div>
          ))}
        </div>
        {imageError && <p className="text-red-500">Invalid file type</p>}
        <p className="text-slate-400 text-sm mb-5">
          Supported formats are .jpg, .gif and .png, 5MB max
        </p>
        <input
          className="border border-slate-400 outline-none rounded-md md:p-3 sm:py-2 sm:px-4 px-3 py-1.5 w-full "
          placeholder="Link to youtube video"
          value={youtubeLink}
          onChange={handleYoutbeChange}
        />
        {error && (
          <p className="text-red-500 text-sm">
            Invalid url please add valid link
          </p>
        )}
        <button
          onClick={nextStep}
          disabled={
            images.length < 1 ||
            !subCategory ||
            !location ||
            error ||
            imageError
          }
          className="bg-[#48AFFF] my-3 disabled:bg-blue-200 text-white font-medium text-[16px] w-full rounded-md p-2.5"
        >
          Next
        </button>
      </div>
    </div>
  );
}
