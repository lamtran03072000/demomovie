import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, SendOutlined, EditFilled } from "@ant-design/icons";
import {
  statusLikeAction,
  submitCommentAction,
} from "../../redux/Action/CommentAction";
export default function PageDetailComment() {
  const [open, setOpen] = useState(false);
  let [contentComment, setContentComment] = useState("");
  let dispatch = useDispatch();
  let dataComment = useSelector((state) => {
    return state.CommentReducer.dataComment;
  });
  let userInfor = useSelector((state) => {
    return state.UserReducer.userInfor;
  });
  // RENDER COMMENT Body
  let renderComment = () => {
    return dataComment.map((itemComment) => {
      return (
        <div key={itemComment.id} className="grid grid-cols-9 w-full pr-24">
          <div className="relative ">
            <img
              className="w-1/2 absolute top-0 right-1 rounded-full"
              src={itemComment.hinhAnh}
              alt=""
            />
          </div>
          <div className="col-span-8">
            <div className="inline-block relative px-2 pt-3 pb-4 bg-gray-300 rounded-lg">
              <div className="font-semibold ">{itemComment.name}</div>
              <div className="">{itemComment.content}</div>
              <span className="flex items-center absolute px-1 rounded-lg -bottom-3 right-3 bg-white shadow ">
                {itemComment.numberLike > 0 ? (
                  <>
                    <LikeOutlined className="text-purple-300" />
                    <span>{itemComment.numberLike}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="text-gray-500 font-medium px-2">
              <span
                onClick={() => {
                  dispatch(statusLikeAction(itemComment.id));
                }}
                className="cursor-pointer"
              >
                {itemComment.statusLike ? "Dislike" : "Like"}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };
  // GET VALUE WRITE COMMENT
  let handleChangeValueComment = (e) => {
    let { value } = e.target;
    setContentComment(value);
  };
  let handleSubmitComment = (e) => {
    e.preventDefault();
    let id = new Date().getTime();
    let name = userInfor.hoTen;
    let content = contentComment;

    let hinhAnh =
      "https://i.pinimg.com/564x/59/30/e7/5930e7a0a193cc6ec933303b93455445.jpg";
    let statusLike = false;
    let numberLike = 0;
    dispatch(
      submitCommentAction(id, name, content, hinhAnh, statusLike, numberLike)
    );
    setContentComment("");
  };
  return (
    <div>
      <button
        className="px-2 py-2 text-white hover:text-white bg-purple-500 hover:bg-purple-700 rounded-md duration-150"
        onClick={() => setOpen(true)}
      >
        Đến bình luận *meo meo*
      </button>
      <Modal
        title="Bình luận"
        footer={null}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <form className="space-y-7" action="">
          <div className="h-96 space-y-7 overflow-auto">{renderComment()}</div>
          <div className="grid  grid-cols-9 w-full pr-24 pt-5 border-t-2">
            <div className="relative ">
              <img
                className="w-1/2 absolute top-0 right-1 rounded-full"
                src="https://i.pinimg.com/564x/59/30/e7/5930e7a0a193cc6ec933303b93455445.jpg"
              />
            </div>
            <div className="col-span-8 grid grid-cols-9 gap-2">
              <input
                className="col-span-8 py-3 px-3  border outline-purple-400 rounded-lg"
                placeholder="Write a comment..."
                onChange={handleChangeValueComment}
                type="text"
                value={contentComment}
                name="comment"
              />
              <div className="relative ">
                <button
                  onClick={handleSubmitComment}
                  type="submit"
                  className="absolute bottom-2 left-0 text-lg text-purple-500 hover:text-purple-700 font-semibold cursor-pointer"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
