import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
export default function PageDetailMap() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span
        className="flex items-center space-x-1 text-purple-500  hover:text-purple-700"
        onClick={() => setOpen(true)}
      >
        <EnvironmentOutlined /> <span> Bản đồ </span>
      </span>
      <Modal
        footer={null}
        bodyStyle={{ padding: "0px" }}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
      >
        <iframe
          className="w-full h-[32rem]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.389453222693!2d106.75401021458872!3d10.857954360653137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175270cb59e61b5%3A0x2921e07100a71953!2zQ3liZXJTb2Z0IEFjYWRlbXkgVGjhu6cgxJDhu6lj!5e0!3m2!1sen!2s!4v1668089727693!5m2!1sen!2s"
        ></iframe>
      </Modal>
    </div>
  );
}
