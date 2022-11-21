import { movieSerVice } from "../../Service/MovieService";
import {
  ADD_CHAIR,
  REMOVE_CHAIR,
  SET_INFO_MOVIE_BOOKING,
} from "../constant/BookingChairConstant";

export const setInfoBookingMovieAction = ({ id }) => {
  return (dispatch) => {
    let fetchApi = async ({ id }) => {
      let params = {
        MaLichChieu: id,
      };
      try {
        let res = await movieSerVice.getInfoBookingMovie(params);
        dispatch({
          type: SET_INFO_MOVIE_BOOKING,
          payload: res.data.content,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi({ id });
  };
};
export const addChairAction = (ghe) => {
  return {
    type: ADD_CHAIR,
    payload: ghe,
  };
};
export const removeChairAction = () => {
  return {
    type: REMOVE_CHAIR,
  };
};
