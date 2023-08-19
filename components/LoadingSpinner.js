import React from "react";
import LoadingAnimation from "../public/loadingSpinner.json";
import { useLottie } from "lottie-react";

export default function Loading({ style = "" }) {
  const options = {
    animationData: LoadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div className={`w-10 h-10 `}>{View}</div>;
}
