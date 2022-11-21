import { https } from "./urlConfig";

export const userService = {
  postUser: (data) => {
    // return axios({
    //   url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
    //   method: "POST",
    //   data: data,
    //   headers: configHeader(),
    // });
    let uri = "/api/QuanLyNguoiDung/DangNhap";
    return https.post(uri, data);
  },
  postRegisterUser: (data) => {
    let uri = "/api/QuanLyNguoiDung/DangKy";
    return https.post(uri, data);
  },
  getInfoUser: () => {
    let uri = "/api/QuanLyNguoiDung/ThongTinTaiKhoan";
    return https.post(uri);
  },
  putUpdateInfo: (data) => {
    let uri = "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung";
    return https.put(uri, data);
  },
  postUserInfo: () => {
    let uri = "/api/QuanLyNguoiDung/ThongTinTaiKhoan";
    return https.post(uri);
  },
};
