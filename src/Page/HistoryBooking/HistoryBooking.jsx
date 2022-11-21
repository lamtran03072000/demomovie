import moment from "moment/moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backGroundLogin } from "../../asset/img/linkImg";
import HeaderPage from "../../components/Header/HeaderPage";
import { userService } from "../../Service/UserService";
import style from "./historyBooking.module.css";

export default function HistoryBooking() {
  let userInfor = useSelector((state) => state.UserReducer.userInfor);
  let navigate = useNavigate();

  let [userInfo, setUserInfo] = useState([]);
  let fetchUserInfo = async () => {
    try {
      let res = await userService.postUserInfo();
      console.log("res: ", res.data.content);
      setUserInfo(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!userInfor) {
      navigate("/");
    }
  }, [userInfor]);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  let renderGheDaDat = (danhSachGhe) => {
    return danhSachGhe?.map((chair) => {
      return (
        <span key={chair.maGhe} className="mx-1">
          {chair.tenGhe}
        </span>
      );
    });
  };
  let renderHistory = () => {
    return userInfo.thongTinDatVe?.map((info) => {
      return (
        <li key={info.maVe} className={`${style["table-row"]}`}>
          <div
            className={`${style["col"]} ${style["col-1"]}`}
            data-label="Mã vé:"
          >
            {info.maVe}
          </div>
          <div
            className={`${style["col"]} ${style["col-2"]}`}
            data-label="Tên phim:"
          >
            {info.tenPhim}
          </div>
          <div
            className={`${style["col"]} ${style["col-3"]}`}
            data-label="Ngày giờ đặt:"
          >
            {moment(info.ngayDat).format("DD/MM/yy ~ HH:MM")}
          </div>
          <div
            className={`${style["col"]} ${style["col-4"]}`}
            data-label="Ghế đặt:"
          >
            {renderGheDaDat(info.danhSachGhe)}
          </div>
          <div
            className={`${style["col"]} ${style["col-5"]}`}
            data-label="Tên Rạp"
          >
            {info.danhSachGhe[0].tenHeThongRap}
          </div>
        </li>
      );
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundLogin})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      <HeaderPage />
      <div className={`${style["container"]}`}>
        <p className="text-2xl font-bold text-center my-3 text-gray-100">
          Lịch sử mua vé
        </p>
        <ul className={`${style["responsive-table"]}`}>
          <li className={`${style["table-header"]}`}>
            <div className={`${style["col"]} ${style["col-1"]}`}>Mã vé</div>
            <div className={`${style["col"]} ${style["col-2"]}`}>Tên phim</div>
            <div className={`${style["col"]} ${style["col-3"]}`}>
              Ngày giờ đặt
            </div>
            <div className={`${style["col"]} ${style["col-4"]}`}>Ghế đặt</div>
            <div className={`${style["col"]} ${style["col-5"]}`}>Tên Rạp</div>
          </li>
          <div className="flex flex-col-reverse">{renderHistory()}</div>
        </ul>
      </div>
    </div>
  );
}
