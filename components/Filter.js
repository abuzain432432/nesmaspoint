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
  } = props;

  const [openDropdown, setOpenDropDown] = useState();
  const [categories, setCategories] = useState();
  const [subCategory, setSubCategory] = useState();
  const [loadFetch, setLoadFetch] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  const [price, setPrice] = useState({ min: "", max: "" });
  const [color, setColor] = useState(null);

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

  const onSearch = async () => {
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
    setCategoryKeyword("");
    setSubCategory("");
    setSubCategoryKeyword("");
    setPrice({ min: "", max: "" });
    setColor(null);
    setLocation("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Keywords"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        className="border bg-white border-slate-400 rounded-md p-3 mb-4 w-full outline-none"
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
        className="relative border bg-white border-slate-400 rounded-md p-3 mb-4"
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
          className="relative border bg-white border-slate-400 rounded-md p-3 mb-4"
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
        className="border bg-white relative border-slate-400 rounded-md p-3 mb-4"
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
      <div className="bg-white rounded-md p-4">
        <h3 className="mb-2 text-lg font-semibold">Price (NKN)</h3>
        <div className="flex space-x-3 justify-between">
          <input
            placeholder="Min"
            className="w-[150px] p-2 rounded-md outline-none appearance-none border border-slate-300"
            type="number"
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
          />
          <span className="text-xl font-medium">-</span>
          <input
            placeholder="Max"
            className="w-[150px] p-2 rounded-md outline-none border border-slate-300"
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
        />
      </div>
      <button
        className="bg-blue-400 p-3 bg-[#48AFFF] text-white w-[125px] rounded-md mt-4 mr-4"
        type="submit"
        onClick={onSearch}
      >
        Search
      </button>
      <button
        className="bg-blue-400 p-3 bg-[#48AFFF] text-white w-[125px] rounded-md mt-4"
        onClick={onClearFilter}
        type="button"
      >
        Clear Filter
      </button>
    </div>
  );
}
