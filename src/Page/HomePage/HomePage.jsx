import React from "react";
import HeaderPage from "../../components/Header/HeaderPage";
import BannerHomePage from "./Banner/BannerHomePage";
import MovieList from "./MovieList/MovieList";
import MovieTabs from "./MovieTab/MovieTabs";
import SpeedBooking from "./SpeedBookingMovie/SpeedBooking";

export default function HomePage() {
  return (
    <div>
      <HeaderPage />
      <BannerHomePage />
      <SpeedBooking />
      <MovieList />
      <MovieTabs />
    </div>
  );
}
