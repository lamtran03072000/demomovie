import logo from "./logo.svg";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import LoginPage from "./Page/LoginPage/LoginPage";
import LoadingSpin from "./components/Loading/LoadingSpin";
import PageDetaillMovie from "./Page/DetailPage/PageDetailMovie";
import BookTicketPage from "./Page/BookTicketPage/BookTicketPage";
import RegisterPage from "./Page/RegisterPage/RegisterPage";

import UserInfoPage from "./Page/UserInfoPage/UserInfoPage";
import ButtonToTop from "./components/ButtonToTop/ButtonToTop";
import HistoryBooking from "./Page/HistoryBooking/HistoryBooking";

function App() {
  return (
    <BrowserRouter>
      <LoadingSpin />
      <ButtonToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:id" element={<PageDetaillMovie />} />
        <Route path="/bookticket/:id" element={<BookTicketPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/history" element={<HistoryBooking />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
