"use client";
import Carousal from "@/components/Carousal";
import { URL } from "@/config";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import Image from "next/image";
import React, { use, useContext, useEffect, useState } from "react";
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
import { Modal, Form, Input, Button } from "antd";
import { AppCtx } from "@/app-context/AppContext";

export default function Page({ params }) {
  const [ad, setAd] = useState({});
  const { appLoading } = useContext(AppCtx);
  const [isReportModelActive, setIsReportModelActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sendingReport, setSendingReport] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const user = useSelector((state) => state?.authReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = location.href;
  const getAdData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${URL}/api/v1/ads/administration/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(data.data[0]);

      setAd(data.data[0]);
    } catch (error) {
      if (error?.response?.request?.status) router.back();
    } finally {
      setLoading(false);
    }
  };

  const onModelOpen = (name) => {
    dispatch(onModelToggle(name));
  };

  useEffect(() => {
    if (!appLoading) getAdData();
  }, [appLoading]);
  useEffect(() => {
    if (!appLoading && user.role == "user") {
      router.push("/");
    }
  }, [appLoading, user]);

  if (loading || appLoading) {
    return (
      <div className="min-h-screen ">
        <Loading />
      </div>
    );
  }
  const handleReportButton = () => {
    if (!user?.token) {
      return toast.error("Please login to report abuse", {
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
    if (!user?.active) {
      toast.error("Please activate your account to report abuse", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return router.push(`/otp/?email=${user?.email}`);
    }
    setIsReportModelActive(true);
  };
  const handleReportFormSubmit = async (data) => {
    try {
      setSendingReport(true);
      const { data: responseData } = await axios.patch(
        `${URL}/api/v1/ads/report/${params?.id}`,
        { report: data.message },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success("Your report has been submited successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsReportModelActive(false);
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
      setSendingReport(false);
    }
  };
  return (
    <>
      <Modal
        footer={false}
        key={params?.id}
        onCancel={() => setIsReportModelActive(false)}
        open={isReportModelActive}
        className="bg-white rounded-lg report-modal"
      >
        <Form onFinish={handleReportFormSubmit} layout="vertical">
          <Form.Item
            rules={[{ required: true, message: "Please wirte a message" }]}
            required
            label="Message"
            name={"message"}
          >
            <Input.TextArea
              placeholder="Please describe your issue"
              rows={6}
            ></Input.TextArea>
          </Form.Item>
          <Button
            loading={sendingReport}
            disabled={sendingReport}
            htmlType="submit"
            className="block report-btn w-full"
          >
            Send Report
          </Button>
        </Form>
      </Modal>
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
                  <div className="flex text-gray-400 gap-1 items-center">
                    <AiOutlineEye />
                    <p>{ad.views}</p>
                    <p>views</p>
                  </div>

                  <div className="flex gap-1 text-gray-400  items-center">
                    <MdVisibilityOff />
                    <p>{ad.impressions}</p>
                    <p>impressions</p>
                  </div>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(ad?.description).replace(
                    /\n/g,
                    "<br>"
                  ),
                }}
                className="text-gray-600 my-2"
              ></p>
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
              </div>

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
            </div>
          </div>
          <div className="2xl:w-[375px] lg:w-[300px] md:w-[270px]  xl:w-[350px] w-full  md:gap-x-0  sm:gap-x-6 gap-x-4 gap-y-4 sm:gap-y-6 md:flex-col md:gap-4 md:flex grid md:grid-cols-1 grid-cols-1 sm:grid-cols-2 space-y-5">
            <div className="bg-white p-4 shadow-md rounded-md clear-margin">
              <h3 className="font-semibold text-[24px]  text-center">
                NGN {new Intl.NumberFormat().format(ad.price)} {ad?.priceType}
              </h3>
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
                } ${
                  Boolean(ad?.user?.lastName) ? ad?.user?.lastName : ""
                }`}</h3>
              </div>
              {user?.active ? (
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="flex items-center my-3 space-x-2 rounded-md py-2 w-full justify-center text-white bg-[#48AFFF] font-semibold"
                >
                  <MdPhoneInTalk />
                  <span>
                    {showContact ? ad?.phoneNumber : "Contact Seller"}
                  </span>
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
                  Before making payment, make sure you examine the item
                  thoroughly{" "}
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
                onClick={handleReportButton}
                className="flex items-center justify-center mt-3 border-red-600 border  w-full py-2 rounded-md text-red-600 space-x-2 font-semibold"
              >
                <AiFillFlag color="red" />
                <span>Report Abuse</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
