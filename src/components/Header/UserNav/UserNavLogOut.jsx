import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
export default function UserNavLogOut() {
  let navigate = useNavigate();
  return (
    <div className="space-x-4">
      <button
        onClick={() => {
          navigate("/login");
        }}
        className=" px-2 py-2  bg-purple-700  text-white hover:text-white hover:py-[0.6rem]    transition rounded-xl"
      >
        <span className="flex items-center space-x-1">
          <UserOutlined /> <span className="font-bold ">Đăng nhập</span>
        </span>
      </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="px-4 py-2   bg-white  text-black  hover:py-[0.6rem] rounded-xl"
      >
        <span className="flex items-center space-x-1">
          <UserAddOutlined /> <span className="font-bold ">Đăng ký</span>
        </span>
      </button>
    </div>
  );
}
