import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollHeader from "../../HOC/Scroll/ScrollHeader";
import UserNav from "./UserNav/UserNav";

export default function HeaderPage() {
  let navigate = useNavigate();
  const scrollDirection = ScrollHeader();
  return (
    <div
      style={{
        transition: "0.5s",
      }}
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } py-4  bg-zinc-900 z-30 shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center  px-10  ">
        <div
          onClick={() => {
            {
              navigate("/");
            }
          }}
          className="text-5xl text-purple-700  font-extrabold cursor-pointer"
        >
          BeFlox
        </div>
        <div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
