import {
  ADD_CHAIR,
  REMOVE_CHAIR,
  SET_INFO_MOVIE_BOOKING,
} from "../constant/BookingChairConstant";

const initialState = {
  listChair: [],
  listBookingChair: [],
  infoMovie: {},
};

export const BookingChairReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_INFO_MOVIE_BOOKING:
      {
        state.listChair = payload.danhSachGhe.slice(0, 100);
        state.infoMovie = payload.thongTinPhim;
        return { ...state };
      }
      break;
    case ADD_CHAIR:
      {
        let cloneListBookingChair = [...state.listBookingChair];
        let index = cloneListBookingChair.findIndex(
          (ghe) => ghe.maGhe === payload.maGhe
        );
        if (index === -1) {
          cloneListBookingChair.push(payload);
        } else {
          cloneListBookingChair.splice(index, 1);
        }
        return { ...state, listBookingChair: cloneListBookingChair };
      }
      break;
    case REMOVE_CHAIR:
      {
        return { ...state, listBookingChair: [] };
      }
      break;

    default:
      return state;
  }
};
