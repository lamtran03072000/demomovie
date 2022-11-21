import React from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import bg_loading from "../../asset/bg_loading.json";
export default function LoadingSpin() {
  let isLoading = useSelector((state) => {
    return state.LoadingReducer.isLoading;
  });
  return isLoading ? (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black">
      <div className="scale-50 flex w-full h-full items-center justify-center">
        <Lottie animationData={bg_loading} />
      </div>
    </div>
  ) : (
    ""
  );
}
