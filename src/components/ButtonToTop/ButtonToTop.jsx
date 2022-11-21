import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import style from "./buttonToTop.module.css";

export default function ButtonToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={`${style["top-to-btm"]}`}>
      {" "}
      {showTopBtn && (
        <FaAngleUp
          className={`${style["icon-position"]} ${style["icon-style"]}`}
          onClick={goToTop}
        />
      )}{" "}
    </div>
  );
}
