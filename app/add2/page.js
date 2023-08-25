"use client";
import MultiSelect from "@/components/MultiSelect";
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { colorData } from "@/Data/FilterData";
import PromoteAd from "../PromoteAd";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addData } from "@/redux/features/adSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { URL } from "@/config";
import Loading from "@/components/LoadingSpinner";

export default function Page() {
  const [condition, setCondition] = useState(null);
  const [isConditionInvalid, setIsConditionInvalid] = useState(null);
  const [isConditionFocus, setIsConditionFocus] = useState(null);

  const [adPosting, setAdPosting] = useState(false);

  const [color, setColor] = useState([]);
  const [isColorInvalid, setIsColorInvalid] = useState(null);
  const [isColorFocus, setIsColorFocus] = useState(null);

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [negotiable, setNegotiable] = useState(null);
  const [isNegotiableInvalid, setIsNegotiableInvalid] = useState(null);
  const [isNegotiableFocus, setIsNegotiableFocus] = useState(null);

  const [title, setTitle] = useState("");
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isTitleFocus, setIsTitleFocus] = useState(false);

  const [description, setDescription] = useState("");
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);
  const [isDescriptionFocus, setIsDescriptionFocus] = useState(false);

  const [price, setPrice] = useState("");
  const [isPriceInvalid, setIsPriceInvalid] = useState("");
  const [isPriceFocus, setIsPriceFocus] = useState("");

  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkSize, setBulkSize] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState(false);
  const [isPhoneNumberFocus, setIsPhoneNumberFocus] = useState(false);

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { adsReducer } = useSelector((state) => state);
  const [selectedAd, setSelectedAd] = useState({
    name: "Free",
    price: "0",
    duration: "0 days",
    boostValue: 0,
  });
  const router = useRouter();
  const user = useSelector((state) => state.authReducer);

  const conditionOptions = [
    { label: "Brand New", value: "new" },
    { label: "Used", value: "used" },
  ];
  const negotiableOptions = [
    { label: "Negotiable", value: true },
    { label: "Fixed", value: false },
  ];

  const onClear = () => {
    setCondition(null);
    setColor(null);
    setNegotiable(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setPhoneNumber("");
    setName("");
    setSelectedAd("");
  };
  const onSubmit = async () => {
    try {
      const images = adsReducer.images ?? [];

      let formData = new FormData();
      color.forEach((item) => formData.append("color", item.value));

      images.forEach((file, index) => {
        formData.append(`photos`, file.file);
      });
      for (let pair of Object.entries(adsReducer)) {
        if (pair[0] !== "images") {
          formData.append(pair[0], pair[1]);
        }
      }

      formData.append("condition", condition?.value);
      formData.append("boostValue", selectedAd.boostValue);
      formData.append("phoneNumber", phoneNumber);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("name", name);
      formData.append("priceType", negotiable?.value);
      formData.append("bulkPrice", bulkPrice);
      formData.append("bulkSize", bulkSize);
      setAdPosting(true);
      const { data } = await axios.post(`${URL}/api/v1/ads`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUnsavedChanges(false);
      toast.success(
        data?.data ||
          "Your request to post ad has been sent successfully .Please wait to approve it ",
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
      router.push(data?.data?.data?.authorization_url ?? router.replace("/"));
    } catch (error) {
      if (
        error?.message ==
        "Cannot read properties of undefined (reading 'startsWith')"
      ) {
        return;
      }
      toast.error(error?.response?.data?.message || "Something went wrong", {
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
      setAdPosting(false);
    }
  };

  useEffect(() => {
    if (!adsReducer?.category) {
      router.replace("/sell");
    }
  }, [adsReducer]);

  useEffect(() => {
    if (title.trim() === "") {
      setIsTitleInvalid(true);
    } else {
      setIsTitleInvalid(false);
    }
  }, [title]);
  useEffect(() => {
    setUnsavedChanges(true);
  }, []);

  useEffect(() => {
    if (condition?.value === undefined) {
      setIsConditionInvalid(true);
    } else {
      setIsConditionInvalid(false);
    }
  }, [condition]);

  useEffect(() => {
    if (price.trim() === "" || isNaN(price)) {
      setIsPriceInvalid(true);
    } else {
      setIsPriceInvalid(false);
    }
  }, [price]);
  useEffect(() => {
    if (color.length == 0) {
      setIsColorInvalid(true);
    } else {
      setIsColorInvalid(false);
    }
  }, [color]);

  useEffect(() => {
    if (phoneNumber.trim() === "" || isNaN(phoneNumber)) {
      setIsPhoneNumberInvalid(true);
    } else {
      setIsPhoneNumberInvalid(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (description.trim()?.length < 7) {
      setIsDescriptionInvalid(true);
    } else {
      setIsDescriptionInvalid(false);
    }
  }, [description]);

  useEffect(() => {
    if (negotiable?.value === undefined) {
      setIsNegotiableInvalid(true);
    } else {
      setIsNegotiableInvalid(false);
    }
  }, [negotiable]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        router.push("/sell");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <div className="max-w-[600px] mx-auto my-10 px-3">
      <div className="flex bg-white shadow-md it justify-between px-4 py-2 rounded-md">
        <button
          onClick={() => router.back()}
          className="text-[#48AFFF] flex  items-center text-lg "
        >
          <IoChevronBackOutline size={20} />
          <span>back</span>
        </button>
        <span className="text-[#48AFFF] font-medium text-xl ">Ad Post</span>
        <button onClick={onClear} className="text-[#48AFFF] ">
          clear
        </button>
      </div>
      <form className="w-full  my-6">
        <input
          className={`border w-full ${
            isTitleInvalid && isTitleFocus ? "mb-1" : "mb-4"
          } border-slate-300 px-4 py-2.5 rounded-md `}
          type="text"
          placeholder="Enter Ad Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsTitleFocus(true)}
          onBlur={() => setIsTitleFocus(false)}
        />
        {isTitleInvalid && isTitleFocus && (
          <p className="text-red-500 mb-4">Please enter the product title</p>
        )}
        <MultiSelect
          value={condition}
          setValue={setCondition}
          options={conditionOptions}
          name="condition"
          placeholder="Condition*"
          hasError={isConditionInvalid && isConditionFocus}
          onFocus={() => setIsConditionFocus(true)}
          onBlur={() => setIsConditionFocus(false)}
        />
        {isConditionInvalid && isConditionFocus && (
          <p className="text-red-500 mb-4 whitespace-nowrap">
            Please select product condition (new or used)
          </p>
        )}
        <MultiSelect
          isMulti={true}
          value={color}
          setValue={setColor}
          options={colorData}
          name="color"
          placeholder="Color*"
          // ///////
          onFocus={() => setIsColorFocus(true)}
          onBlur={() => setIsColorFocus(false)}
        />
        {isColorInvalid && isColorFocus && (
          <p className="text-red-500 mb-4 whitespace-nowrap">
            Please select product color
          </p>
        )}
        <textarea
          className={`border w-full ${
            isDescriptionInvalid && isDescriptionFocus ? "mb-1" : "mb-4"
          } border-slate-300 resize-none px-4 py-2.5 rounded-md`}
          placeholder="Enter Ad Description*"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setIsDescriptionFocus(true)}
          onBlur={() => setIsDescriptionFocus(false)}
        />
        {isDescriptionFocus && isDescriptionInvalid && (
          <p className="text-red-500 mb-4 whitespace-nowrap">
            Please enter few words about product
            <span>(minumum 7 character)</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Ad Price"
          className={`border w-full border-slate-300 resize-none px-4 py-2.5 rounded-md ${
            isPriceFocus && isPriceInvalid ? "mb-1" : "mb-4"
          }`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onFocus={() => setIsPriceFocus(true)}
          onBlur={() => setIsPriceFocus(false)}
        />
        {isPriceFocus && isPriceInvalid && (
          <p className="text-red-500 mb-4">
            Please enter product price (must be number)
          </p>
        )}
        <div className="grid mb-4 grid-cols-1 md:grid-cols-2 gap-12">
          <input
            type="text"
            placeholder="Ad Bulk Price"
            className="border w-full border-slate-300 resize-none px-4 py-2.5 rounded-md"
            value={bulkPrice}
            onChange={(e) => setBulkPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ad Bulk Quantity"
            className="border w-full border-slate-300 resize-none px-4 py-2.5 rounded-md"
            value={bulkSize}
            onChange={(e) => setBulkSize(e.target.value)}
          />
        </div>
        <MultiSelect
          isMulti={false}
          value={negotiable}
          setValue={setNegotiable}
          options={negotiableOptions}
          name="negotiable"
          placeholder="Price Type"
          onFocus={() => setIsNegotiableFocus(true)}
          onBlur={() => setIsNegotiableFocus(false)}
          hasError={isNegotiableFocus && isNegotiableInvalid}
        />
        {isNegotiableFocus && isNegotiableInvalid && (
          <p className="text-red-500 mb-4">Please product price type</p>
        )}
        <div className="">
          <input
            type="text"
            placeholder="Enter Your Phone Number"
            className="border w-full border-slate-300 resize-none px-4 py-2.5 rounded-md"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={() => setIsPhoneNumberFocus(true)}
            onBlur={() => setIsPhoneNumberFocus(false)}
          />
          {isPhoneNumberInvalid && isPhoneNumberFocus && (
            <p className="text-red-500 mb-4">
              Please enter your valid phone number
            </p>
          )}
          {/* <input
            type="text"
            placeholder="Enter Your Name"
            className="border w-full border-slate-300 resize-none px-4 py-2.5 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}
        </div>
      </form>
      <PromoteAd selectedAd={selectedAd} setSelectedAd={setSelectedAd} />
      <button
        disabled={
          isTitleInvalid ||
          isPhoneNumberInvalid ||
          isDescriptionInvalid ||
          isPriceInvalid ||
          isNegotiableInvalid ||
          isConditionInvalid ||
          isColorInvalid ||
          adPosting
        }
        onClick={onSubmit}
        className={`bg-[#48AFFF] flex items-center justify-center my-3  disabled:bg-blue-200 text-white font-medium text-[16px] w-full rounded-md  ${
          adPosting ? "" : "p-2.5"
        }`}
      >
        Create
        {adPosting && <Loading />}
      </button>
    </div>
  );
}
