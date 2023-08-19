"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdsCard from "./AdsCard";
import { URL } from "@/config";
import Loading from "@/components/Loading";
function DashboardUserAds() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //   console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/api/v1/ads?page=${1}&limit=${20}`,
          {
            method: "GET",
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data.data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  if (loading) {
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );
  }
  const handleAdDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      {data?.data?.length <= 0 ? (
        <h3 className="text-2xl  text-center mt-20 font-semibold w-full">
          No Ads Found Click on the post add button to post ads
        </h3>
      ) : (
        <div className="flex-1">
          <h1 className="text-3xl mb-6 text-center mt-10 font-semibold w-full">
            Your's ads
          </h1>
          <div className="grid w-[90%] mx-auto items-start grid-cols-2 lg:grid-cols-4 gap-6 ">
            {data?.map((ad) => (
              <AdsCard ad={ad} userAdd={true} onAdDelete={handleAdDelete} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardUserAds;
