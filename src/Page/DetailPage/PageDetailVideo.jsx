import { Button, Modal } from "antd";
import React, { useState } from "react";
import { linkPressPlayVideo } from "../../asset/img/linkImg";

export default function PageDetailVideo({ dataTrailer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div
        onClick={() => setOpen(true)}
        className="w-14 h-14 hover:w-20 hover:h-20 duration-150"
      >
        <img className="w-full h-full" src={linkPressPlayVideo} alt="" />
      </div>
      {open ? (
        <Modal
          bodyStyle={{ padding: "0px" }}
          footer={null}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={900}
        >
          <iframe
            width={"100%"}
            height={500}
            src={`${dataTrailer}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
