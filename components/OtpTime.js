"use client";

import React, { useState, useEffect } from "react";

const OtpTime = ({ onTimeComplete }) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((preTime) => preTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);
  const mints = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${String(mints).padStart(2, 0)}:${String(
    seconds
  ).padStart(2, 0)}`;
  return (
    <>
      <p
        role="button"
        onClick={() => {
          if (time <= 0) {
            setTime(10);
            onTimeComplete();
          }
        }}
        className={` py-1.5 flex items-center text-gray-600 rounded-lg justify-center md:mt-4 mt-2  md:px-4 px-2 md:text-base text-sm  ${
          time > 0 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Resend One-Time Password
      </p>
      {time ? (
        <p className="text-center leading-[1.2] -mt-2.5 text-gray-500 md:text-base text-sm ">
          Please wait for
          <span className="font-semibold px-1">{timeString}</span>
          before sending another OTP.
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default OtpTime;
