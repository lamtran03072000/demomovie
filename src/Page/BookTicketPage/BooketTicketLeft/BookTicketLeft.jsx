import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChairAction } from "../../../redux/Action/BookingChairAction";
import styleLeft from "./BookTicketLeft.module.css";
export default function BookTicketLeft() {
  let dispatch = useDispatch();
  let danhSachGhe = useSelector((state) => state.BookingChairReducer.listChair);
  let danhSachGheDangDat = useSelector(
    (state) => state.BookingChairReducer.listBookingChair
  );
  let renderGhe = () => {
    return danhSachGhe?.map((ghe) => {
      let styleGhe = ``;
      let disable = false;
      // Xét Ghế Thường
      if (ghe.loaiGhe === "Thuong") {
        styleGhe = `${styleLeft["ghe"]} `;
      } else {
        styleGhe = `${styleLeft["gheVip"]}`;
      }
      //Xét Ghế Đã Đặt
      if (ghe.daDat) {
        styleGhe = `${styleLeft["gheDaDat"]}`;
        disable = true;
      }
      // Xét Ghế Đang Đặt
      let index = danhSachGheDangDat?.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (index !== -1) {
        styleGhe = `${styleLeft["gheDangDat"]}`;
      }
      return (
        <button
          disabled={disable}
          onClick={() => {
            dispatch(addChairAction(ghe));
          }}
          key={ghe.maGhe}
          className={`${styleGhe}`}
        >
          <span>{ghe.tenGhe}</span>
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* // Màn Hình  */}
      <div
        className={`w-2/3 ${styleLeft["manHinh"]} bg-gray-800 shadow-lg flex items-end justify-center`}
      >
        <span className="text-white">Màn hình</span>
      </div>
      {/* //Ghế  */}
      <div className="w-5/6 grid grid-cols-10 gap-5 mt-12 mb-6">
        {renderGhe()}
      </div>
      <hr className="w-3/4" />
      <div className="w-2/3 py-4 flex items-center justify-between text-center text-white  ">
        <div className="">
          <button className={`${styleLeft["normal"]}`}>x</button>
          <br />
          <span>Ghế thường</span>
        </div>
        <div>
          <button className={`${styleLeft["gheDaDat"]} text-gray-500`}>
            <span className="text-black">x</span>
          </button>
          <br /> <span className="">Ghế đã đặt</span>
        </div>
        <div>
          <button className={`${styleLeft["special"]}`}>x</button> <br />{" "}
          <span className="">Ghế vip</span>
        </div>
        <div>
          <button className={`${styleLeft["ordering"]}`}>x</button> <br />{" "}
          <span className="">Ghế đang đặt</span>
        </div>
      </div>
    </div>
  );
}
