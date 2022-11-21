import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieSerVice } from "../../../Service/MovieService";
import { MA_NHOM } from "../../../Service/urlConfig";
import Swal from "sweetalert2";
import style from "./SpeedBooking.module.css";
export default function SpeedBooking() {
  let navigate = useNavigate();
  let [dataListMovie, setDataListMovie] = useState([]);
  let [thongTinHeThongRapChieu, setThongTinHeThongRapChieu] = useState([]);
  let [thongTinTatCaCumRap, setThongTinTatCaCumRap] = useState([]);
  let [valueCumRap, setValueCumRap] = useState();
  let [disable, setDisable] = useState(false);
  let selectTenPhim = useRef();
  let selectCumRap = useRef();
  let selectLichChieu = useRef();
  useEffect(() => {
    fetchApiListMovie();
  }, []);
  let fetchApiListMovie = async () => {
    let params = {
      maNhom: MA_NHOM,
    };
    try {
      let res = await movieSerVice.getListMovie(params);
      setDataListMovie(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  let soSanhHaiArray = (arr1, arr2) => {
    const soSanh = JSON.stringify(arr1) === JSON.stringify(arr2);
    return soSanh;
  };
  //CALL API DATA SHOW TIME
  let fetchApiShowTime = async (maPhim) => {
    let params = {
      MaPhim: maPhim,
    };
    try {
      let res = await movieSerVice.getMovieShowTimeById(params);
      setThongTinHeThongRapChieu(res.data.content.heThongRapChieu);
    } catch (err) {
      console.log(err);
    }
  };
  // RENDER PHIM
  let renderOptionNameMovie = () => {
    return dataListMovie.map((movie) => {
      return (
        <option key={movie.maPhim} value={movie.maPhim}>
          {movie.tenPhim}
        </option>
      );
    });
  };
  // CHANGE VALUE PHIM
  let handleChangeValueNameMovie = (e) => {
    let { value } = e.target;
    if (value != 0) {
      fetchApiShowTime(value);
      setDisable(true);
    }
  };
  // RENDER CỤM RẠP
  let renderOptionCumRap = () => {
    let tatCaCumRap = [];
    thongTinHeThongRapChieu.forEach((heThongRap) => {
      heThongRap.cumRapChieu.forEach((cumRap) => {
        tatCaCumRap.push(cumRap);
      });
    });
    let soSanh = soSanhHaiArray(tatCaCumRap, thongTinTatCaCumRap);
    if (!soSanh) {
      setThongTinTatCaCumRap(tatCaCumRap);
    }
    return tatCaCumRap.map((cumRap) => {
      return (
        <option key={cumRap.maCumRap} value={cumRap.maCumRap}>
          {cumRap.tenCumRap}
        </option>
      );
    });
  };
  //CHANGE VALUE CỤM RẠP
  let handleChangeValueCumRap = (e) => {
    let { value } = e.target;
    setValueCumRap(value);
  };
  //RENDER LỊCH CHIẾU
  let renderNgayChieuGioChieu = () => {
    let cumRapUserChon = thongTinTatCaCumRap.find(
      (cumRap) => cumRap.maCumRap == valueCumRap
    );
    return cumRapUserChon?.lichChieuPhim.map((lichChieu) => {
      return (
        <option key={lichChieu.maLichChieu} value={lichChieu.maLichChieu}>
          {lichChieu.ngayChieuGioChieu}
        </option>
      );
    });
  };
  // HANDLE SUBMIT
  let handleSubmit = () => {
    // console.log("selectLichChieu.current.value", selectLichChieu.current.value);
    // console.log("selectLichChieu.current.value", selectCumRap.current.value);
    let checkValueLichChieu = selectLichChieu.current.value;
    let checkValueCumRap = selectCumRap.current.value;
    if (checkValueCumRap != 0 && checkValueLichChieu != 0) {
      navigate(`/bookticket/${checkValueLichChieu}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui lòng chọn đủ thông tin",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="grid grid-cols-4 w-5/6 p-3 border-gray-500 border shadow-xl rounded ">
        {/* // RENDER PHIM  */}
        <div className={` ${style["parents__select"]}`}>
          <select
            className={`${style["select"]}`}
            ref={selectTenPhim}
            onChange={handleChangeValueNameMovie}
          >
            <option disabled={disable} value="0">
              Chọn tên phim
            </option>
            {renderOptionNameMovie()}
          </select>
        </div>
        {/* // RENDER RẠP PHIM  */}
        <div className={`${style["parents__select"]}`}>
          <select
            className={`${style["select"]}`}
            ref={selectCumRap}
            onChange={handleChangeValueCumRap}
          >
            <option value="0">Chọn cụm rạp</option>
            {renderOptionCumRap()}
          </select>
        </div>
        {/* // RENDER NGÀY CHIẾU GIỜ CHIẾU */}
        <div className={`${style["parents__select"]}`}>
          <select className={`${style["select"]}`} ref={selectLichChieu}>
            <option value="0">Chọn ngày giờ</option>
            {renderNgayChieuGioChieu()}
          </select>
        </div>
        {/* // XÁC NHẬN ĐẶT VÉ  */}
        <div className=" flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="bg-purple-700 px-3 py-2 text-white w-2/3 rounded-xl"
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
}
