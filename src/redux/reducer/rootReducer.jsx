import { combineReducers } from "redux";
import { BookingChairReducer } from "./BookingChairReducer";
import { CommentReducer } from "./CommentReducer";
import { LoadingReducer } from "./LoadingReducer";
import UserReducer from "./UserReducer";

export const rootReducer = combineReducers({
  UserReducer,
  LoadingReducer,
  CommentReducer,
  BookingChairReducer,
});
