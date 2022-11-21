import { BAT_LOADING, TAT_LOADING } from "../constant/LoadingConstant";

const initialState = {
  isLoading: false,
  count: 0,
};

export const LoadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BAT_LOADING:
      {
        state.isLoading = true;
        state.count++;
        return { ...state };
      }
      break;
    case TAT_LOADING: {
      state.count--;
      if (state.count == 0) {
        state.isLoading = false;
      }
      return { ...state };
    }
    default:
      return state;
  }
};
