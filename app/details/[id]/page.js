"use client";
//import AdsCard from "@/components/AdsCard";

import Carousal from "@/components/Carousal";
import { URL } from "@/config";
import AdsData from "@/Data/AdsData";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { AiOutlineEye } from "react-icons/ai";
import { MdVisibilityOff } from "react-icons/md";
import { images } from "@/next.config";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillFlag } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { MdLocationOn, MdPhoneInTalk } from "react-icons/md";
import moment from "moment";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { onModelToggle } from "@/redux/features/modelSlice";
import Loading from "@/components/Loading";
import { usePathname } from "next/navigation";

export default function Page({ params }) {
  const [ad, setAd] = useState({});
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const user = useSelector((state) => state?.authReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getAdData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/api/v1/ads/${params?.id}`);

      setAd(data.data[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  console.log(ad);

  const onModelOpen = (name) => {
    dispatch(onModelToggle(name));
  };

  useEffect(() => {
    getAdData();
  }, []);

  const detail = {
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/66/2015_Toyota_Fortuner_%28New_Zealand%29.jpg",
      "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Tucson-220720221406.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/66/2015_Toyota_Fortuner_%28New_Zealand%29.jpg",
      "https://toyota-indus.com/wp-content/uploads/2023/04/YARIS-AERO-ALL-NEW-SLEEK-AND-STYLISH-SIDE-SKIRTS.png",
      "https://upload.wikimedia.org/wikipedia/commons/6/66/2015_Toyota_Fortuner_%28New_Zealand%29.jpg",
      "https://toyota-indus.com/wp-content/uploads/2023/04/YARIS-AERO-ALL-NEW-SLEEK-AND-STYLISH-SIDE-SKIRTS.png",
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Tucson/10136/1684743559495/front-left-side-47.jpg",
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen ">
        <Loading />
      </div>
    );
  }
  const hadleTestingFeature = () => {
    toast.success("Comming soon", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  console.log(searchParams.get("user"));
  return (
    <div className=" md:px-6 lg:px-8 xl:px-16 sm:px-10 px-2 pt-6  xl:py-16 md:py-10 mb-10  ">
      <div className="flex flex-col md:gap-0 sm:gap-10 gap-5 md:space-y-0 md:flex-row md:space-x-4 w-full">
        <div className="flex-1 bg-white rounded-md overflow-hidden">
          <div className="flex flex-col xl:flex-row md:space-x-4">
            <div className="flex-1 relative mb-3">
              <Carousal images={ad?.photos ?? []} />
            </div>
            <div className="md:gap-4 sm:gap-3 gap-2 flex flex-wrap xl:flex-col">
              <>
                {ad.photos?.slice(0, 5).map((item, index) => {
                  return (
                    <div
                      className={`relative w-[100px] md:h-[100px] md:w-[100px] rounded-lg overflow-hidden sm:h-[100px] h-[70px] ${
                        ad.photos.length === 1 ? "md:w-1/3" : "flex-1"
                      } `}
                    >
                      <Image
                        fill={true}
                        className="object-cover"
                        src={`${URL}/images/ads/${item}`}
                      />
                    </div>
                  );
                })}
              </>
            </div>
          </div>

          <div className="px-4 pb-2 pt-5 ">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-semibold  md:text-[26px]  text-[18px] text-slate-700">
                {ad.title}
              </h1>
            </div>
            <div className="space-x-3 mb-6 flex md:gap-4 gap-2 flex-wrap">
              {ad?.color?.map((item) => (
                <span className="border px-4 py-2  bg-gray-50 rounded-md text-gray-500">
                  {item}
                </span>
              ))}
              <div className="flex gap-3 items-center">
                {searchParams.get("user") && (
                  <div className="flex text-gray-400 gap-1 items-center">
                    <AiOutlineEye />
                    <p>{ad.views}</p>
                    <p>views</p>
                  </div>
                )}
                {searchParams.get("user") && (
                  <div className="flex gap-1 text-gray-400  items-center">
                    <MdVisibilityOff />
                    <p>{ad.impressions}</p>
                    <p>impressions</p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 my-2">{ad?.description}</p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 text-slate-500 justify-between border-b border-slate-200 pb-5">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0   md:items-center md:space-x-5 ">
                <p className="flex space-x-1 items-center">
                  <BsClock />
                  <span className="text-sm">
                    {moment(ad?.createdAt).fromNow()}
                  </span>
                </p>
                <p className="flex md:-ml-0 -ml-[3px] text-sm space-x-1 items-center">
                  <MdLocationOn size={20} />
                  <span>{ad?.location}</span>
                </p>
              </div>
              {/* <p className="flex text-sm space-x-1 items-center">
                <AiFillEye size={20} />
                <span>152 Views</span>
              </p> */}
            </div>
            {/* {user?.active ? (
              <div className="flex items-center my-5 space-x-2 rounded-md py-2 w-[225px] justify-center text-white bg-[#48AFFF] font-semibold">
                <MdPhoneInTalk />
                <span>{ad?.phoneNumber}</span>
              </div>
            ) : (
              <button
                onClick={() => onModelOpen("login")}
                className="my-5  rounded-md py-2 w-[225px] text-white bg-[#48AFFF] font-semibold"
              >
                Login To View Number
              </button>
            )} */}
            <div className="flex space-x-2 items-center py-6 border-b border-t border-slate-200">
              <FacebookShareButton quote={ad?.title} url={pathname}>
                <FacebookIcon size={28} />
              </FacebookShareButton>
              <EmailShareButton subject={ad?.title} url={pathname}>
                <EmailIcon size={28} />
              </EmailShareButton>
              <TwitterShareButton title={ad?.title} url={pathname}>
                <TwitterIcon size={28} />
              </TwitterShareButton>
              <WhatsappShareButton title={ad?.title} url={pathname}>
                <WhatsappIcon size={28} />
              </WhatsappShareButton>
            </div>
            <div
              title="White Fortuner car for sale"
              url="https://protfolio-green.vercel.app/"
              onClick={hadleTestingFeature}
            >
              <p
                role="button"
                className="border-[#48AFFF] border text-center cursor-pointer my-5 w-[225px] py-2 rounded-md text-[#48AFFF] font-semibold"
              >
                Make an offer
              </p>
            </div>
          </div>
        </div>
        <div className="2xl:w-[375px] lg:w-[300px] md:w-[270px]  xl:w-[350px] w-full  md:gap-x-0  sm:gap-x-6 gap-x-4 gap-y-4 sm:gap-y-6 md:flex-col md:gap-4 md:flex grid md:grid-cols-1 grid-cols-1 sm:grid-cols-2 space-y-5">
          <div className="bg-white p-4 shadow-md rounded-md clear-margin">
            <h3 className="font-semibold text-[24px] mb-2.5 text-center">
              NGN {ad.price} {ad?.priceType}
            </h3>
            <button
              onClick={hadleTestingFeature}
              className="border-[#48AFFF] border  w-full py-2 rounded-md text-[#48AFFF] font-semibold"
            >
              Request Callback
            </button>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md clear-margin">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  fill={true}
                  src="https://imagevars.gulfnews.com/2022/09/15/F1rst-Motors_18341cfa4e5_large.jpg"
                />
              </div>
              <h3 className="font-semibold text-[18px]">{`${
                ad?.user?.firstName || "Unknown"
              } ${Boolean(ad?.user?.lastName) ? ad?.user?.lastName : ""}`}</h3>
            </div>
            {user?.active ? (
              <button
                onClick={() => setShowContact(!showContact)}
                className="flex items-center my-3 space-x-2 rounded-md py-2 w-full justify-center text-white bg-[#48AFFF] font-semibold"
              >
                <MdPhoneInTalk />
                <span>{showContact ? ad?.phoneNumber : "Contact Seller"}</span>
              </button>
            ) : !user?.token ? (
              <button
                onClick={() => onModelOpen("login")}
                className=" my-3 rounded-md py-2 w-full  text-white bg-[#48AFFF] font-semibold"
              >
                Login to Contact Seller
              </button>
            ) : (
              <button
                onClick={() => router.push(`/otp?email=${user?.email}`)}
                className=" my-3 rounded-md py-2 w-full  text-white bg-[#48AFFF] font-semibold"
              >
                Activate your Account
              </button>
            )}
          </div>

          <div className="bg-white px-4 py-5 shadow-md rounded-md clear-margin">
            <h3 className="text-lg font-semibold text-center">Safety Tips</h3>
            <ul className="text-[15px] text-gray-500 mt-1.5 list-disc px-4">
              <li>Avoid making any payments, even for delivery purposes</li>
              <li>Aim to meet in a secure and public place</li>
              <li>
                Before making payment, make sure you examine the item thoroughly{" "}
              </li>
              <li>Make the payment only after you have received the Item</li>
            </ul>
          </div>
          <div className="bg-white px-4 py-5 shadow-md rounded-md clear-margin">
            {user?.active ? (
              <button
                onClick={() => router.push("sell")}
                className="border-sky-700border  w-full py-2 rounded-md text-[#48AFFF] font-semibold"
              >
                Post Ad Like This
              </button>
            ) : (
              <button
                onClick={() => onModelOpen("login")}
                className="border-sky-700border  w-full py-2 rounded-md text-[#48AFFF] font-semibold"
              >
                Login To Post Ad Like This
              </button>
            )}
            <button
              onClick={hadleTestingFeature}
              className="flex items-center justify-center mt-3 border-red-600 border  w-full py-2 rounded-md text-red-600 space-x-2 font-semibold"
            >
              <AiFillFlag color="red" />
              <span>Report Abuse</span>
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <h1 className="text-[22px] my-3 font-semibold text-slate-700">
          Similar Adverts
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {AdsData.map(ad => (
            <AdsCard ad={ad} />
          ))}
        </div>
      </div>*/}
    </div>
  );
}
