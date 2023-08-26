"use client";
import AdsCard from "@/components/AdsCard";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";
import { RiFilter3Line } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import React, { useEffect, useState } from "react";

export default function Page({ searchParams }) {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [state, setState] = useState();
  const [location, setLocation] = useState();
  const [categories, setCategories] = useState();
  const [subCategory, setSubCategory] = useState();
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState();

  useEffect(() => {
    setCategories(searchParams?.category);
    setSubCategory(searchParams?.subCategory);
  }, [searchParams]);
  return (
    <div className="flex   xl:gap-x-7  md:gap-x-5 md:flex-row flex-col md:px-6 lg:px-8 xl:px-8 sm:px-10 px-4 pt-6  xl:py-16 md:py-10 mb-10">
      <div className="md:hidden uppercase  font-semibold  text-gray-400  justify-between flex sm:mb-3 mb-2">
        <p className="">Filters</p>
        <div
          className="text-2xl"
          onClick={() => setIsFilterActive((pre) => !pre)}
        >
          {isFilterActive ? <AiOutlineMinus /> : <RiFilter3Line />}
        </div>
      </div>
      <div>
        <Filter
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
          state={state}
          setState={setState}
          location={location}
          setLocation={setLocation}
          categoryKeyword={categories}
          subCategoryKeyword={subCategory}
          setCategoryKeyword={setCategories}
          setSubCategoryKeyword={setSubCategory}
          setAdsData={setAdsData}
          setLoading={setLoading}
          setDisplayLocation={setDisplayLocation}
        />
      </div>
      <div className=" flex-1">
        {loading ? (
          <div className="">
            <Loading />
          </div>
        ) : adsData.length ? (
          <>
            <h3 className="md:text-2xl text-xl font-semibold text-slate-700 mb-4">
              {adsData.length} Ads found in {subCategory || categories} in
              {displayLocation || "Nigeria"}
            </h3>
            <div className="grid xl:gap-6 lg:gap-5 md:gap-4 2xl:grid-cols-3 gap-4  md:grid-cols-2">
              {adsData.map((ad) => (
                <AdsCard ad={ad} />
              ))}
            </div>
          </>
        ) : (
          <div className="">
            <h3 className="lg:text-2xl text-center sm:text-xl text-lg font-semibold text-slate-700 mb-4">
              No Ad found .You can try another location or maybe another
              catagory or sub-category
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
