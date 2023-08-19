import React from "react";
import LoadingAnimation from "../public/Loading-animation.json";
import { useLottie } from "lottie-react";

export default function Loading({ style = "" }) {
    
  const options = {
    animationData: LoadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div className={`flex items-center justify-center h-full w-full `}>{View}</div>;
}
