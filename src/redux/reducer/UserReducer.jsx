import { userLocal } from "../../Service/localService";
import { SET_LOGIN } from "../constant/UserConstant";

const initialState = {
  userInfor: userLocal.get(),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN: {
      return { ...state, userInfor: payload };
    }
    default:
      return state;
  }
};
