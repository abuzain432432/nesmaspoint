"use client";
import AdsCard from "@/components/AdsCard";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";

import React, { useEffect, useState } from "react";

export default function Page({ searchParams }) {
  const [keywordParam, setKeywordParam] = useState("");
  const [subKeywordParam, setSubKeywordParam] = useState("");
  const [state, setState] = useState();
  const [location, setLocation] = useState();
  const [categories, setCategories] = useState();
  const [subCategory, setSubCategory] = useState();
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCategories(searchParams?.category);
    setSubCategory(searchParams?.subCategory);
  }, [searchParams]);
  return (
    <div className="flex md:flex-row flex-col space-x-4 p-8">
      <div className="w-[400px]">
        <Filter
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
        />
      </div>
      <div className=" flex-1">
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">
        {adsData.length} Ads found in  {subCategory || categories} in {location || "Nigeria"}
        </h3>
       {loading?<div className=""><Loading/></div>: <div className="grid gap-6  grid-cols-2  lg:grid-cols-3">
          {adsData.map(ad => (
            <AdsCard ad={ad} />
          ))}
        </div>}
      </div>
    </div>
  );
}
