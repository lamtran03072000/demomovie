import { Tabs, Collapse, Rate } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import sr_login from "../../asset/sr_loading.json";
import PageDetailMap from "./PageDetailMap";
import PageDetailComment from "./PageDetailComment";
import ButtonDatVe from "../../components/DatVe/ButtonDatVe";

const { Panel } = Collapse;
const CustomTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #aa00ff !important;
  }
  .ant-tabs-tab:hover {
    color: #e254ff !important;
  }
  .ant-tabs-ink-bar {
    position: absolute;
    background: #7200ca;
    pointer-events: none;
  }
`;
export default function PageDetailShowtime(props) {
  // {
  //   props.showTime,
  //   props.scrollRefMuaVe,
  //   tenPhim,
  //   hinhAnh,
  // }
  let renderLichChieuPhim = (lichChieuPhim, tenCumRap, diaChiCumRap) => {
    return lichChieuPhim.map((schedule) => {
      return (
        <ButtonDatVe
          key={schedule.maLichChieu}
          maLichChieu={schedule.maLichChieu}
          ngayChieuGioChieu={schedule.ngayChieuGioChieu}
          tenCumRap={tenCumRap}
          diaChiCumRap={diaChiCumRap}
          tenPhim={props.showTime.tenPhim}
          hinhAnh={props.hinhAnh}
          maPhim={props.maPhim}
        />
      );
    });
  };
  // RENDER THEATER ============================
  let renderTheater = (cumRapChieu, logo) => {
    return cumRapChieu?.map((cumRap) => {
      return (
        <Panel
          header={
            <div className="flex justify-around w-full">
              <div className="w-1/12 flex items-center">
                <img src={logo} alt="" />
              </div>
              <div className="w-10/12 text-left  border-b">
                <div className="text-xl">{cumRap.tenCumRap}</div>
                <div className="flex items-center justify-between text-sm space-x-2">
                  <span>{cumRap.diaChi}</span> <PageDetailMap />
                  <span></span>
                </div>
              </div>
            </div>
          }
          key={cumRap.maCumRap}
        >
          <div className="h-full overflow-auto">
            {renderLichChieuPhim(
              cumRap.lichChieuPhim,
              cumRap.tenCumRap,
              cumRap.diaChi
            )}
          </div>
        </Panel>
      );
    });
  };
  // RENDER CONTENT ===============================
  let renderContent = () => {
    if (props.showTime.heThongRapChieu.length !== 0) {
      return props.showTime.heThongRapChieu?.map((heThongRap) => {
        return (
          <Tabs.TabPane
            tab={
              <div className=" p-2 border border-gray-400 rounded-lg ">
                <img className="w-8 h-8" src={heThongRap.logo} />
              </div>
            }
            key={heThongRap.maHeThongRap}
          >
            <Collapse
              accordion
              expandIconPosition="end"
              style={{ height: "30rem" }}
              defaultActiveKey="1"
            >
              {renderTheater(heThongRap.cumRapChieu, heThongRap.logo)}
            </Collapse>
          </Tabs.TabPane>
        );
      });
    } else {
      return (
        <div className="container text-center text-xl font-semibold mb-3">
          <div className="w-1/3 mx-auto">
            <Lottie animationData={sr_login} />
            Hiện chưa có lịch chiếu cho phim này !!!
          </div>
        </div>
      );
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 ref={props.scrollRefMuaVe} className="mb-5 text-xl font-bold ">
        Lịch chiếu {props.showTime.tenPhim}
      </h1>
      <div>
        {props.showTime.dangChieu ? (
          // {/* // SHOW PHIM DANG CHIEU ======================== */}
          <div className="flex pb-10  border ">
            <div className="w-2/3">
              <CustomTabs
                tabBarGutter={"2rem"}
                tabBarExtraContent={{
                  left: <div className="w-8"></div>,
                }}
                tabPosition="top"
                defaultActiveKey="BHDStar"
              >
                {renderContent()}
              </CustomTabs>
            </div>
            {/* // CARD ĐÁNH GIÁ  ==================================== */}
            <div className="w-1/3 flex   justify-center">
              <div className="w-auto font-bold text-center mt-20 h-96 mx-auto rounded shadow-lg border ">
                <Lottie className="" animationData={sr_login} />
                Đánh giá của phim !!! <br />
                <Rate disabled allowHalf defaultValue={props.danhGia / 2} />
                <p className="mt-2">
                  {props.danhGia * 10}% người xem hài lòng với phim này
                </p>
                <div className="py-6">
                  <PageDetailComment />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // SHOW PHIM CHƯA CHIẾU ===========================================
          <div className="container text-center  text-xl font-semibold mb-3">
            <div className="w-1/3 mx-auto">
              <Lottie animationData={sr_login} />
              Phim sẽ sớm ra mắt trong thời gian tới !!!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
