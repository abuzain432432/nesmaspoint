"use client";
import PlacesData from "@/Data/PlacesData";
import sidebarData from "@/Data/sidebarData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { colorData, priceFilters } from "@/Data/FilterData";
import Select from "react-select";
import axios from "axios";
import { URL } from "@/config";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
export default function Filter(props) {
  const {
    state,
    setState,
    location,
    setLocation,
    categoryKeyword,
    subCategoryKeyword,
    setCategoryKeyword,
    setSubCategoryKeyword,
    setAdsData,
    setLoading,
    setDisplayLocation,
    setIsFilterActive,
    isFilterActive,
  } = props;

  const [openDropdown, setOpenDropDown] = useState();
  const [categories, setCategories] = useState();
  const [subCategory, setSubCategory] = useState();
  const [loadFetch, setLoadFetch] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const searchQueries = useSearchParams();

  const [price, setPrice] = useState({ min: "", max: "" });
  const [color, setColor] = useState(null);
  console.log("Search Params", searchQueries.get("category"));
  useEffect(() => {
    const selectedCategory = sidebarData.find(
      (ctg) => ctg.title == categoryKeyword
    );
    setCategories(selectedCategory);
  }, [categoryKeyword, subCategoryKeyword]);

  console.log("Price", price);

  const handleLocationClick = (e, item) => {
    e.stopPropagation();
    setOpenDropDown("location");
    setState(item);
  };

  console.log("Color", color, color?.length > 1);

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const queryParams = [];

      if (categoryKeyword) queryParams.push(`category=${categoryKeyword}`);
      if (subCategoryKeyword)
        queryParams.push(`subCategory=${subCategoryKeyword}`);
      if (location) queryParams.push(`location=${location}`);
      if (price.min) queryParams.push(`price[gt]=${price.min}`);
      if (price.max) queryParams.push(`price[lt]=${price.max}`);
      if (searchParams) queryParams.push(`searchTerm=${searchParams}`);
      if (color?.length >= 1) {
        const colorsParams = color?.map((item) => item.value).join(",");
        queryParams.push(`color=${colorsParams}`);
      }

      const queryString = queryParams.join("&");
      console.log("Query String -----------", queryString);
      const response = await axios.get(`${URL}/api/v1/ads?${queryString}`);
      console.log("Response", response);
      setAdsData(response?.data?.data);
      setDisplayLocation(location);
      if (isFilterActive) {
        setIsFilterActive(false);
      }
    } catch (error) {
      console.log("Error in Api", error);
    } finally {
      setLoading(false);
    }
  };

  const onLoadSearch = async () => {
    console.log("___________ on Search _________");
    try {
      setLoading(true);

      const queryParams = [];

      if (categoryKeyword) queryParams.push(`category=${categoryKeyword}`);
      if (subCategoryKeyword)
        queryParams.push(`subCategory=${subCategoryKeyword}`);

      const queryString = queryParams.join("&");
      console.log("Query String -----------", queryString);
      const response = await axios.get(`${URL}/api/v1/ads?${queryString}`);
      console.log("Response", response);
      setAdsData(response?.data?.data);
    } catch (error) {
      console.log("Error in Api", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Category keyword", categoryKeyword);

  useEffect(() => {
    if (!loadFetch && categoryKeyword) {
      onLoadSearch();
      setLoadFetch(true);
    }
  }, [categoryKeyword, subCategoryKeyword]);

  const onClearFilter = () => {
    setCategoryKeyword(searchQueries.get("category") || "");
    setSubCategory(searchQueries.get("subCategory") || "");
    setSubCategoryKeyword(searchQueries.get("subCategory") || "");
    setPrice({ min: "", max: "" });
    setColor(null);
    setLocation("");
    searchAfterFilter();
    setSearchParams("");
    setDisplayLocation("");
    if (isFilterActive) {
      setIsFilterActive(false);
    }
  };

  const searchAfterFilter = async () => {
    try {
      setLoading(true);

      const queryParams = [];

      if (searchQueries.get("category"))
        queryParams.push(`category=${searchQueries.get("category")}`);
      if (searchQueries.get("subCategory"))
        queryParams.push(`subCategory=${searchQueries.get("subCategory")}`);

      const queryString = queryParams.join("&");
      console.log("Query String -----------", queryString);
      const response = await axios.get(`${URL}/api/v1/ads?${queryString}`);
      console.log("Response", response);
      setAdsData(response?.data?.data);
    } catch (error) {
      console.log("Error in Api", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`${
        isFilterActive ? "block" : "md:block hidden"
      } 2xl:w-[380px] md:mb-0 mb-10 xl:w-[350px] lg:w-[300px] md:w-[250px]`}
      onSubmit={onSearch}
    >
      <input
        type="text"
        placeholder="Enter Keywords"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        className="border bg-white border-slate-400 rounded-md 2xl:p-3 lg:p-2 md:p-1.5 md:px-3 sm:px-4 px-3 py-2 mb-2.5 md:mb-3 w-full outline-none"
      />
      {openDropdown && (
        <div
          onClick={() => {
            setOpenDropDown("");
          }}
          className="absolute inset-0 "
        />
      )}

      <div
        onClick={() => setOpenDropDown("category")}
        className="relative border bg-white border-slate-400 rounded-md 2xl:p-3 lg:p-2 sm:px-4 px-3 py-2 md:p-1.5 md:px-3 mb-2.5 md:mb-3"
      >
        <input
          className="w-full border-none outline-none"
          type="text"
          placeholder="Category"
          value={categoryKeyword}
        />
        {/* Drop Down -------------- */}

        {openDropdown === "category" && (
          <div className="absolute z-20 top-14 -left-1 -right-2 h-[500px] overflow-scroll">
            <div className="bg-white border border-slate-300">
              {sidebarData.map((item) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropDown("");
                    setCategoryKeyword(item?.title);
                    setSubCategory("");
                    setSubCategoryKeyword("");
                  }}
                  className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 py-4 border-b border-slate-200"
                >
                  {/* <Image width={40} height={40} src={item.image} /> */}
                  <span className="flex-1">{item.title}</span>
                  <BsChevronRight color="gray" size={16} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {categoryKeyword && (
        <div
          onClick={() => setOpenDropDown("subCategory")}
          className="relative border bg-white border-slate-400 rounded-md 2xl:p-3 lg:p-2 sm:px-4 px-3 py-2 md:p-1.5 md:px-3 mb-2.5 md:mb-3"
        >
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="SubCategory"
            value={subCategory || subCategoryKeyword}
          />
          {/* Drop Down -------------- */}

          {openDropdown === "subCategory" && (
            <div className="absolute z-20 top-14 -left-1 -right-2 h-[500px] overflow-scroll">
              <div className="bg-white border border-slate-300">
                {categories.subCategories.map((item) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubCategory(item.title);
                      setOpenDropDown("");
                      setSubCategoryKeyword(item?.title);
                    }}
                    className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 py-4 border-b border-slate-200"
                  >
                    {/* <Image width={40} height={40} src={item.image} /> */}
                    <span className="flex-1">{item.title}</span>
                    <BsChevronRight color="gray" size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        onClick={() => setOpenDropDown("state")}
        className="border bg-white relative border-slate-400 rounded-md 2xl:p-3 lg:p-2 sm:px-4 px-3 py-2 md:p-1.5 md:px-3 mb-4"
      >
        <input
          className="w-full border-none outline-none"
          type="text"
          placeholder="Select Location*"
          value={location}
        />

        {openDropdown === "state" && (
          <div className="absolute bg-white z-20 top-14 -left-1 -right-2 h-[500px] overflow-scroll">
            <div className=" border border-slate-300">
              {PlacesData.map((item) => (
                <div
                  onClick={(e) => handleLocationClick(e, item)}
                  className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 py-4 border-b border-slate-200"
                >
                  <span className="flex-1">{item.name}</span>
                  <BsChevronRight color="gray" size={16} />
                </div>
              ))}
            </div>
          </div>
        )}

        {openDropdown === "location" && (
          <div className="absolute z-20 top-14 -left-1 -right-2 h-[500px] overflow-scroll">
            <div className="bg-white border border-slate-300">
              {state.cities.map((item) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation(item);
                    setOpenDropDown("");
                  }}
                  className="flex cursor-pointer hover:bg-sky-100 items-center space-x-4 px-4 py-4 border-b border-slate-200"
                >
                  <span className="flex-1">{item}</span>
                  <BsChevronRight color="gray" size={16} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-md md:p-4 sm:p-6 p-4">
        <h3 className="mb-2 text-lg font-semibold">Price (NGN)</h3>
        <div className="flex items-center xl:gap-x-2 sm:gap-x-2 lg:gap-x-1.5 md:gap-x-1 justify-between">
          <input
            placeholder="Min"
            className="xl:p-2 sm:py-2 sm:px-4  lg:py-1.5 px-3 py-1.5 lg:px-2 md:py-1 md:px-1.5 flex-1 w-full rounded-md outline-none appearance-none border border-slate-300"
            type="number"
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
          />
          <span className="text-xl font-medium">-</span>
          <input
            placeholder="Max"
            className="xl:p-2 lg:py-1.5 sm:py-2 sm:px-4 px-3 py-1.5 lg:px-2 md:py-1 md:px-1.5 flex-1 w-full rounded-md outline-none border border-slate-300"
            type="number"
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
          />
        </div>
        <div className="pt-3">
          {priceFilters.map((item) => (
            <div className="space-x-2 mb-1.5">
              <input
                type="radio"
                name="price"
                onChange={(e) => setPrice({ min: item.min, max: item.max })}
                checked={price.min === item.min && price.max === item.max}
              />
              <label>{item.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-4 mt-4">
        <h3 className="mb-2 text-lg font-semibold">Colors</h3>
        <Select
          isMulti={true}
          defaultValue={color}
          onChange={setColor}
          options={colorData}
          isSearchable={true}
          value={color}
        />
      </div>
      <div className="flex">
        <button
          className=" 2xl:p-3 lg:p-2 p-1.5 bg-[#48AFFF] text-white 2xl:w-[125px] w-[105px] sm:w-[125px] rounded-md mt-4 mr-4"
          type="submit"
        >
          Search
        </button>
        <button
          className="2xl:p-3 lg:p-2 p-1.5 bg-[#48AFFF] text-white 2xl:w-[125px] w-[105px] sm:w-[125px] rounded-md  mt-4"
          onClick={onClearFilter}
          type="button"
        >
          Clear Filter
        </button>
      </div>
    </form>
  );
}
