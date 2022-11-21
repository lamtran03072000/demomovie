import React from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import style from "./BookTicketRight.module.css";
import { maVach } from "../../../asset/img/linkImg";
import { movieSerVice } from "../../../Service/MovieService";
import { removeChairAction } from "../../../redux/Action/BookingChairAction";
import { useNavigate } from "react-router-dom";
export default function BookTicketRight() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { infoMovie, listBookingChair } = useSelector(
    (state) => state.BookingChairReducer
  );
  let userInfor = useSelector((state) => state.UserReducer.userInfor);
  let isLoading = useSelector((state) => state.LoadingReducer.isLoading);
  let renderListBookingChair = () => {
    return listBookingChair?.map((ghe) => {
      return <span key={ghe.maGhe}>{ghe.tenGhe} , </span>;
    });
  };
  let submitBuyTicket = () => {
    let maLichChieu = infoMovie.maLichChieu;
    let danhSachVe = listBookingChair.map((ghe) => {
      return { maGhe: ghe.maGhe, giaVe: ghe.giaVe };
    });
    let dataListBookingChair = {
      maLichChieu: maLichChieu,
      danhSachVe: danhSachVe,
    };
    if (listBookingChair.length > 0) {
      let sendDataListBookingChair = async (data) => {
        try {
          let res = await movieSerVice.postDataBookingChair(data);
          // /// DISPATCH LẠI
          dispatch(removeChairAction());
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Đặt vé thành công",
              showConfirmButton: false,
              timer: 1000,
            });
          }, 500);
          // Chuyển trang
          navigate("/history");
        } catch (err) {
          console.log(err);
        }
      };
      sendDataListBookingChair(dataListBookingChair);
    } else {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Đặt thất bại, bạn chưa chọn ghế",
          showConfirmButton: false,
          timer: 2000,
        });
      }, 500);
    }
  };
  return (
    <div className={`${style["ticketSytem"]} h-full`}>
      <div className={`h-5/6 px-5 pt-5 bg-purple-700`}>
        <div className={`${!isLoading ? `${style["ticket"]}` : ""}`}>
          <h1 className="text-white text-lg font-medium mb-2 ">Vé xem phim</h1>
          {/* // Top Thông tin vé ================================================================================================*/}
          <div
            className={`${style["ticketTop"]} h-4/6  rounded-xl  px-8 pt-2 space-y-2`}
          >
            {/* // Tên phim ===================================== */}
            <div className="text-xl font-bold">Phim : {infoMovie.tenPhim}</div>
            {/* //Ngày chiếu giờ chiếu ======================== */}
            <div className="flex items-center justify-between">
              {/* // Ngày Chiếu  */}
              <div>
                <span className={`${style["fontStyleTitle"]}`}>
                  Ngày chiếu :
                </span>{" "}
                <br />
                <span className={`${style["fontStyleInfo"]}`}>
                  {moment(infoMovie.ngayChieu).format("DD-MM-YY")}
                </span>
              </div>
              {/* // Giờ chiếu  */}
              <div>
                <span className={`${style["fontStyleTitle"]}`}>
                  Giờ chiếu :
                </span>
                <br />
                <span className={`${style["fontStyleInfo"]}`}>
                  {infoMovie.gioChieu}
                </span>
              </div>
            </div>
            {/* //Tên cụm rạp  ======================== */}
            <div>
              <h1 className={`${style["fontStyleTitle"]}`}>Tên cụm rạp :</h1>
              <p className={`${style["fontStyleInfo"]}`}>
                {infoMovie.tenCumRap}
              </p>
            </div>
            {/* // Địa chỉ  ======================== */}
            <div>
              <h1 className={`${style["fontStyleTitle"]}`}>Địa chỉ rạp :</h1>
              <p className={`${style["fontStyleInfo"]}`}>{infoMovie.diaChi}</p>
            </div>
            {/* //Ghế Chọn ============================= */}
            <div>
              <h1 className={`${style["fontStyleTitle"]}`}>Ghế chọn :</h1>
              <p className={`${style["fontStyleInfo"]} h-11 overflow-auto`}>
                {renderListBookingChair()}
              </p>
            </div>
          </div>
          {/* //End Top Thông tin vé ==============================================================================================*/}
          <div className="flex items-center justify-center">
            <hr className={`w-3/4 ${style["hr"]} border-dotted border-2`} />
          </div>
          {/* //BOTTOM   ================================================================================================*/}
          <div
            className={`${style["ticketBottom"]} h-1/6 flex items-center rounded-xl `}
          >
            <img src={maVach} className="w-full h-[90%] object-cover" alt="" />
          </div>
        </div>
      </div>
      {/* // Xác Nhận     ================================================================================================*/}
      <div className="h-1/6 flex items-center  px-5">
        {/* // THÔNG TIN THANH TOÁN  */}
        <div className="w-3/5 space-y-2 border-r-2 border-purple-700">
          <div>
            <span className={`${style["fontStyleTitle"]}`}>Tên : </span>
            <span className={`${style["fontStyleInfo"]}`}>
              {userInfor?.hoTen}
            </span>
          </div>
          <div>
            <h1 className={`${style["fontStyleTitle"]}`}>TỔNG TIỀN : </h1>
            <p className={`${style["fontStyleInfo"]}`}>
              {listBookingChair
                ?.reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đồng
            </p>
          </div>
        </div>
        {/* //BTN XÁC NHẬN  */}
        <div className="flex items-center justify-center  w-2/5">
          <button
            onClick={submitBuyTicket}
            className="py-3 px-5 hover:bg-purple-800  bg-purple-700 rounded text-white duration-150"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
