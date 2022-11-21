import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { movieSerVice } from "../../../Service/MovieService";
import { MA_NHOM } from "../../../Service/urlConfig";
import MovieTabItem from "./MovieTabItem";

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
export default function MovieTabs() {
  let [dataMovieTab, setDataMovieTab] = useState([]);
  let fetchApi = async () => {
    let params = {
      maNhom: MA_NHOM,
    };
    try {
      let res = await movieSerVice.getTheater(params);
      setDataMovieTab(res.data.content);
    } catch (err) {}
  };
  useEffect(() => {
    fetchApi();
  }, []);
  let renderMovieTab = () => {
    return dataMovieTab.map((heThongRap, index) => {
      return (
        <Tabs.TabPane
          tab={<img src={heThongRap.logo} className="w-12 h-12" />}
          key={heThongRap.maHeThongRap}
        >
          <MovieTabItem maHeThongRap={heThongRap.maHeThongRap} />
        </Tabs.TabPane>
      );
    });
  };
  return (
    <div className="container mx-auto border">
      <CustomTabs
        tabBarGutter={"5rem"}
        tabBarExtraContent={{
          left: (
            <div className="w-80 text-center text-5xl text-purple-700 font-extrabold">
              BeFlox
            </div>
          ),
        }}
        tabPosition="top"
        defaultActiveKey="BHDStar"
      >
        {renderMovieTab()}
      </CustomTabs>
    </div>
  );
}
