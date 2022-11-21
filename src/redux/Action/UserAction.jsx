import { message } from "antd";
import { userLocal } from "../../Service/localService";
import { userService } from "../../Service/UserService";
import { SET_LOGIN } from "../constant/UserConstant";

export const setLoginUserAction = (valueInput, handleNextPage) => {
  return (dispatch) => {
    let postUserLogin = async () => {
      try {
        let res = await userService.postUser(valueInput);
        dispatch({
          type: SET_LOGIN,
          payload: res.data.content,
        });
        userLocal.set(res.data.content);
        message.success("Đăng nhâp Thành Công");
        handleNextPage();
      } catch (err) {
        message.error("Tài Khoản Hoặc Mật Khẩu Không Đúng");
      }
    };
    postUserLogin();
  };
};
export const registerAction = () => {};
