import React, { useEffect } from "react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backGroundLogin } from "../../asset/img/linkImg";
import HeaderPage from "../../components/Header/HeaderPage";
import { setInfoBookingMovieAction } from "../../redux/Action/BookingChairAction";
import BookTicketLeft from "./BooketTicketLeft/BookTicketLeft";
import BookTicketRight from "./BookTicketRight/BookTicketRight";

export default function BookTicketPage() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let userInfor = useSelector((state) => state.UserReducer.userInfor);
  useEffect(() => {
    if (!userInfor) {
      navigate("/");
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Vui lòng đăng nhập để được mua vé",
          showConfirmButton: false,
          timer: 2000,
        });
      }, 500);
    }
  }, [userInfor]);
  useEffect(() => {
    dispatch(setInfoBookingMovieAction({ id }));
  }, []);
  return (
    <div>
      <HeaderPage />
      <div
        className="py-6"
        style={{
          backgroundImage: "linear-gradient(to right, #fc5c7d, #6a82fb)",
        }}
      >
        <div className="grid grid-cols-7 gap-5 container mx-auto">
          <div className="col-span-5  rounded-xl ">
            <BookTicketLeft />
          </div>
          <div className="col-span-2 bg-white rounded-xl overflow-hidden">
            <BookTicketRight />
          </div>
        </div>
      </div>
    </div>
  );
}
