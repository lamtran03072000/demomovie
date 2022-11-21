import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { backGroundLogin } from "../../asset/img/linkImg";
import { movieSerVice } from "../../Service/MovieService";
import HeaderPage from "../../components/Header/HeaderPage";
import PageDetailShowtime from "./PageDetailShowtime";
import PageDetailVideo from "./PageDetailVideo";
export default function PageDetaillMovie() {
  let scrollRefMuaVe = useRef();
  let { id } = useParams();
  let [showTime, setShowTime] = useState({});
  let [dataMovieDetail, setDataMovieDetail] = useState({});
  let fetchApi = async ({ id }) => {
    let params = {
      MaPhim: id,
    };
    try {
      let res = await movieSerVice.getInforMovieDetail(params);
      setDataMovieDetail(res.data.content);
      let resShowTime = await movieSerVice.getMovieShowTimeById(params);
      setShowTime(resShowTime.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchApi({ id });
  }, []);
  let handelClickScrollMuaVe = () => {
    scrollRefMuaVe.current?.scrollIntoView({ behavior: "smooth" });
  };
  console.log("dataMovieDetail: ", dataMovieDetail);
  return (
    <div>
      <HeaderPage />
      <div
        style={{
          background:
            "linear-gradient(to right,rgba(0,0,0,1)150px,rgba(0,0,0,.8)100%)",
          backgroundImage: `url(${backGroundLogin})`,
        }}
      >
        <div className="flex container px-10  mx-auto h-[30rem] py-12">
          {/* left ------------------ */}
          <div className="w-1/4 group relative ">
            {/* // VIDEO TRAILER ============= */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                transition: "0.5s",
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100  "
            >
              <PageDetailVideo dataTrailer={dataMovieDetail.trailer} />
            </div>
            <img
              className="h-full w-10/12  object-cover mx-auto rounded"
              src={dataMovieDetail.hinhAnh}
              alt=""
            />
          </div>
          {/* right--------------------*/}
          <div className="w-3/4 pl-16 space-y-10">
            <div className="space-y-3">
              <p className="flex items-center space-x-3 text-4xl  font-bold text-white">
                <span className="bg-purple-700 text-lg text-white px-1  rounded-md">
                  C18
                </span>
                <span>{dataMovieDetail.tenPhim}</span>
              </p>
              <p className="text-gray-400 text-base">
                {dataMovieDetail.tenPhim} - 120 Phút
              </p>
              <p className="text-gray-400 text-base">
                Tác Giả : Đào Công Thành - Trần Hoàng Lâm
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xl text-white font-bold">Nội dung</p>
              <p className="text-gray-400 text-base">
                {dataMovieDetail.moTa?.length > 300
                  ? `${dataMovieDetail.moTa.slice(0, 300)}...`
                  : dataMovieDetail.moTa}
              </p>
            </div>
            <div>
              <button
                onClick={handelClickScrollMuaVe}
                className="px-3 py-2 text-lg font-bold bg-purple-700 hover:bg-purple-800 text-white hover:text-white duration-200 rounded"
              >
                Mua vé
              </button>
            </div>
          </div>
        </div>
      </div>
      <PageDetailShowtime
        danhGia={dataMovieDetail.danhGia}
        tenPhim={dataMovieDetail.tenPhim}
        hinhAnh={dataMovieDetail.hinhAnh}
        showTime={showTime}
        scrollRefMuaVe={scrollRefMuaVe}
        maPhim={id}
      />
    </div>
  );
}
