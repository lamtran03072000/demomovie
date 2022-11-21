import React from "react";
import { useSelector } from "react-redux";

import UserNavLogOut from "./UserNavLogOut";
import UserNavLogin from "./UserNavLogin";
export default function UserNav() {
  let userInfor = useSelector((state) => {
    return state.UserReducer.userInfor;
  });

  let renderUserNav = () => {
    if (userInfor) {
      return <UserNavLogin userInfor={userInfor} />;
    } else {
      return <UserNavLogOut />;
    }
  };
  return <div className="flex">{renderUserNav()}</div>;
}
