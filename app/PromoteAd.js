import React, { useState } from "react";

export default function PromoteAd({ selectedAd, setSelectedAd }) {
  const data = [
    { name: "Free", price: "0", duration: "0 days", boostValue: 0 },
    { name: "Best", price: "300", duration: "1 day", boostValue: 1 },
    {
      name: "Boost",
      price: "2100",
      duration: "7 days",
      boostValue: 7,
    },
    {
      name: "Premium Boost",
      price: "6300",
      duration: "21 days",
      boostValue: 21,
    },
    {
      name: "Premium Boost Plus",
      price: "9000",
      duration: "30 days",
      boostValue: 30,
    },
  ];

  return (
    <div className="md:px-20 px-3 py-8 mt-12 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Promote Your Ad</h3>
      {data.map((ad) => (
        <div
          className={`border cursor-pointer ${
            selectedAd?.name === ad?.name && "border-sky-500 border-2"
          } p-4 mb-4 rounded-md`}
          onClick={() => setSelectedAd(ad)}
        >
          <h6 className="text-[16px] mb-3 font-medium">{ad.name}</h6>
          <div className="flex items-center justify-between">
            <span className="bg-sky-200 p-3 text-sky-500 text-sm font-medium rounded-full">
              {ad.duration}
            </span>
            <div>
              <span className="text-xs font-medium text-slate-500 ">NGN </span>
              <span>{ad.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
