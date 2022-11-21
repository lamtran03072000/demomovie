import { data } from "autoprefixer";
import axios from "axios";
import { BASE_URL, configHeader, https } from "./urlConfig";

export const movieSerVice = {
  getBannerMovie: (params) => {
    // return axios({
    //   url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachBanner`,
    //   method: "GET",
    //   headers: configHeader(),
    //   params: params,
    // });
    let uri = "/api/QuanLyPhim/LayDanhSachBanner";
    return https.get(uri, { params });
  },
  getListMoviePagination: (params) => {
    // return axios({
    //   url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhimPhanTrang`,
    //   method: "GET",
    //   headers: configHeader(),
    //   params: params,
    // });
    let uri = "/api/QuanLyPhim/LayDanhSachPhimPhanTrang";
    return https.get(uri, { params });
  },
  getListMovie: (params) => {
    let uri = "/api/QuanLyPhim/LayDanhSachPhim";
    return https.get(uri, { params });
  },
  getTheater: (params) => {
    let uri = "/api/QuanLyRap/LayThongTinHeThongRap";
    return https.get(uri, { params });
  },
  getMovieByTheater: (params) => {
    let uri = "/api/QuanLyRap/LayThongTinLichChieuHeThongRap";
    return https.get(uri, { params });
  },
  getInforMovieDetail: (params) => {
    let uri = "/api/QuanLyPhim/LayThongTinPhim";
    return https.get(uri, { params });
  },
  getMovieShowTimeById: (params) => {
    let uri = "/api/QuanLyRap/LayThongTinLichChieuPhim";
    return https.get(uri, { params });
  },
  getInfoBookingMovie: (params) => {
    let uri = "/api/QuanLyDatVe/LayDanhSachPhongVe";
    return https.get(uri, { params });
  },
  postDataBookingChair: (data) => {
    let uri = "/api/QuanLyDatVe/DatVe";
    return https.post(uri, data);
  },
};
