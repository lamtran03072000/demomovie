import { STATUS_LIKE, SUBMIT_COMMENT } from "../constant/CommentConstant";

export const statusLikeAction = (idComment) => ({
  type: STATUS_LIKE,
  payload: idComment,
});
export const submitCommentAction = (
  id,
  name,
  content,
  hinhAnh,
  statusLike,
  numberLike
) => ({
  type: SUBMIT_COMMENT,
  payload: {
    id,
    name,
    content,
    hinhAnh,
    statusLike,
    numberLike,
  },
});
