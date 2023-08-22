"use client";
import Banner from "@/components/Banner";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HomeBanner from "@/components/HomeBanner";
import AdsData from "@/Data/AdsData";
import AdsCard from "@/components/AdsCard";
import axios from "axios";
import { URL } from "@/config";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loading from "@/components/Loading";
import { addData } from "@/redux/features/addCollection";

export default function Page() {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.adsCollection);
  const { data } = useSelector((state) => state?.adsCollection);
  // console.log("Data of ad collection", data);
  // const [page, setPage] = useState(1);

  const page = useSelector((state) => state.paginationReducer.page);
  const LIMIT = 20;
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${URL}/api/v1/ads?page=${page}&limit=${LIMIT}`
  //     );
  //     console.log("Data of ads ......", response);
  //     dispatch(addData(response?.data));
  //     //     setData(response.data);
  //   } catch (error) {
  //     console.log("------ error ----", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  if (loading) {
    return (
      <div className="md:px-12 px-2.5 py-10 mb-4  flex flex-col md:items-start items-center md:flex-row md:space-x-8">
        <Sidebar />
        <Loading />
      </div>
    );
  }

  if (data?.length <= 0) {
    return (
      <div className="w-full mt-4 h-screen flex items-center justify-center text-2xl font-semibold">
        No Ads Found
      </div>
    );
  }

  return (
    <div>
      <div className="md:px-12 px-2.5 py-10 mb-4  flex flex-col md:items-start items-center md:flex-row md:space-x-8">
        <Sidebar />
        {data?.data?.length <= 0 ? (
          <h3 className="text-2xl  text-center mt-20 font-semibold w-full">
            No Ads Found
          </h3>
        ) : (
          <div className="flex-1 self-start md:mt-0 mt-6 w-full">
            <div>
              <h1 className="text-[22px] mb-3 font-semibold text-slate-700">
                Popular Ads
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
                {data?.data?.map((ad) => (
                  <AdsCard ad={ad} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {data?.pages > 1 && <Pagination totalPages={data?.pages} page={page} />}
    </div>
  );
}
