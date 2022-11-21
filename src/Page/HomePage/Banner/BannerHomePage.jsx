import React, { useEffect, useRef, useState } from "react";
import { movieSerVice } from "../../../Service/MovieService";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

export default function BannerHomePage() {
  let [banner, setBanner] = useState([]);
  let fetchBanner = async () => {
    try {
      let res = await movieSerVice.getBannerMovie();
      setBanner(
        res.data.content.map((bannerMovie) => {
          return bannerMovie.hinhAnh;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBanner();
  }, []);

  let cards = [
    {
      key: uuidv4(),
      content: <Card img={banner[0]} />,
    },
    {
      key: uuidv4(),
      content: <Card img={banner[1]} />,
    },
    {
      key: uuidv4(),
      content: <Card img={banner[2]} />,
    },
  ];
  return (
    <div className="">
      {banner.length == 0 ? (
        ""
      ) : (
        <Carousel
          cards={cards}
          height="500px"
          width="90%"
          margin="23vh auto 0"
          offset={2}
          showArrows={false}
        />
      )}
    </div>
  );
}
