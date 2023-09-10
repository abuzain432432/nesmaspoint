"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdsCard from "./AdsCard";
import { URL as baseURL } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";

import Loading from "@/components/Loading";
function DashboardUserAds() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.authReducer);

  const handleDelete = (id) => {
    setData((preAds) => preAds?.filter((ad) => ad?._id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestHeaders = {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        };

        const { data: responseData } = await axios.get(
          `${baseURL}/api/v1/ads/user`,
          {
            headers: requestHeaders,
          }
        );

        setData(responseData.data);
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
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 mb-8">
      {!data?.length ? (
        <h3 className="md:text-2xl text-xl px-4  text-center mt-20 font-semibold w-full">
          No Ads Found click on the post ads button to post ads
        </h3>
      ) : (
        <>
          <h1 className="xl:text-3xl md:text-2xl text-xl md:mb-6 sm:mb-4 mb-2 text-center md:mt-10 mt-4 font-semibold w-full">
            Your ads
          </h1>
          <div className="grid w-[95%] mx-auto items-start sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-6 ">
            {data?.map((ad) => (
              <AdsCard ad={ad} userAdd={true} onAdDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default DashboardUserAds;
