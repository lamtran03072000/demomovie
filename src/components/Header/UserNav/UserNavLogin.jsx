import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HistoryOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { SET_LOGIN } from "../../../redux/constant/UserConstant";
import { userLocal } from "../../../Service/localService";
export default function UserNavLogin({ userInfor }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex items-end space-x-5">
      <div
        onClick={() => {
          navigate("/userinfo");
        }}
        className=" flex items-end space-x-3  text-white cursor-pointer
       "
      >
        <img
          className=" h-9 w-9 text-xl  bg-[#9E9E9E] rounded-full"
          src="https://i.pinimg.com/564x/59/30/e7/5930e7a0a193cc6ec933303b93455445.jpg"
          alt=""
        />
        <span className="text-lg">{userInfor.hoTen}</span>
      </div>
      <button
        className="text-2xl  pb-1 text-purple-700 hover:text-purple-800  font-bold "
        onClick={showDrawer}
      >
        <MenuOutlined />
      </button>
      <Drawer
        size="default"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        drawerStyle={{ backgroundColor: "#18191A" }}
      >
        {/* //Information  */}
        <div className="space-y-1 ">
          <div className="flex items-center space-x-4 py-3 px-2 hover:bg-[#3A3B3C]  transition rounded-lg">
            <img
              className="h-12 w-12  rounded-full"
              src="https://i.pinimg.com/564x/59/30/e7/5930e7a0a193cc6ec933303b93455445.jpg"
              alt=""
            />
            <div
              onClick={() => {
                navigate("/userinfo");
              }}
              className="cursor-pointer"
            >
              <div className="pt-1 text-xl  text-[#C6C7CC]  font-bold">
                {userInfor.hoTen}
              </div>
              <div className="text-[#ACAFB4]">Xem thông tin cá nhân</div>
            </div>
          </div>
          <hr className=" bg-gray-300" />
        </div>
        {/* // Lịch sử mua vé  */}
        <div
          onClick={() => {
            navigate("/history");
          }}
          className="flex items-center space-x-2 py-3 px-2 mt-2 hover:bg-[#3A3B3C] transition rounded-lg cursor-pointer"
        >
          <HistoryOutlined className="h-8 w-8 leading-7 text-xl  text-white text-center  bg-[#4E4F50] rounded-full" />{" "}
          <span className=" text-lg text-[#C6C7CC] ">Lịch sử mua vé</span>
        </div>
        {/* // LogOut  */}
        <div
          onClick={() => {
            dispatch({
              type: SET_LOGIN,
              payload: null,
            });
            userLocal.remove();
          }}
          className="flex items-center space-x-2 py-3 px-2 mt-2 hover:bg-[#3A3B3C] transition rounded-lg cursor-pointer"
        >
          <LogoutOutlined className="h-8 w-8 leading-7 text-xl  text-white text-center  bg-[#4E4F50] rounded-full" />{" "}
          <span className=" text-lg text-[#C6C7CC] ">Đăng xuất</span>
        </div>
      </Drawer>
    </div>
  );
}
