import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { MA_NHOM } from "../../../Service/urlConfig";
import { movieSerVice } from "../../../Service/MovieService";
import ItemMovie from "./ItemMovie";
import { backGroundLogin } from "../../../asset/img/linkImg";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";

export default function MovieList() {
  let [listMovie, setListMovie] = useState([]);

  const refSlide = useRef();
  useEffect(() => {
    fetchApi();
  }, []);
  let fetchApi = async () => {
    let params = {
      maNhom: MA_NHOM,
    };
    try {
      let res = await movieSerVice.getListMovie(params);
      setListMovie(res.data.content);
      console.log(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  let renderListMovie = () => {
    return listMovie.map((movie, index) => {
      return <ItemMovie key={movie.maPhim} dataMovie={movie} index={index} />;
    });
  };
  const next = () => {
    refSlide.current.slickNext();
    console.log("yes");
  };
  const previous = () => {
    refSlide.current.slickPrev();
  };
  const settings = {
    className: "h-full",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
  };
  return (
    <div
      className="py-12"
      style={{ backgroundImage: `url(${backGroundLogin})` }}
    >
      <h1 className="text-white text-4xl text-center font-bold">
        Danh sách phim
      </h1>
      <div className="relative h-[32rem]  flex items-center justify-center container mx-auto  ">
        {/* // PRE  */}
        <button
          onClick={previous}
          className="  text-gray-300 text-5xl absolute left-0 top-2/5 "
        >
          <LeftCircleFilled />
        </button>
        {/* // NEXT  */}
        <button
          onClick={next}
          className=" text-gray-300 text-5xl absolute right-0 top-2/5"
        >
          <RightCircleFilled />
        </button>
        <div className="h-2/3 w-5/6 ">
          <Slider ref={refSlide} {...settings}>
            {renderListMovie()}
          </Slider>
        </div>
      </div>
    </div>
  );
}
