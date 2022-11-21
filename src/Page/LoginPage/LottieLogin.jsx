import React, { memo } from "react";
import bg_login from "../../asset/bg_login.json";
import Lottie from "lottie-react";
function LottieLogin() {
  return (
    <div className="w-1/3 flex justify-center items-center">
      <div className="scale-50 ">
        <Lottie animationData={bg_login} />
      </div>
    </div>
  );
}
export default memo(LottieLogin);
