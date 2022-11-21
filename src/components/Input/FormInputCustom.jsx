import React, { memo, useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function FormInputCustom({
  valueInput,
  valueErr,
  name,
  label,
  handleChangeValueInput,
  type,
  disable,
}) {
  let [translateLabel, setTranslateLabel] = useState(true);
  let [inputType, setinputType] = useState(true);
  useEffect(() => {
    if (valueInput) {
      setTranslateLabel(false);
    }
  }, [valueInput]);
  return (
    <div className="relative">
      <label
        className={`absolute top-0 left-0 z-10 text-[#8c8c8c]   transition ${
          translateLabel
            ? "translate-x-6 translate-y-3 text-xl"
            : " translate-x-6 translate-y-1 text-xs"
        }`}
      >
        {label}
      </label>
      <input
        disabled={disable ? true : false}
        type={inputType && type == "password" ? "password" : "text"}
        className={`relative  w-full text-lg  pt-5 pb-1 px-6  border bg-[#333333] text-white border-none rounded focus:outline-none focus:bg-[#454545] ${
          disable ? "cursor-no-drop" : ""
        }`}
        name={name}
        value={valueInput}
        onChange={(e) => {
          handleChangeValueInput(e);
        }}
        onFocus={() => {
          if (valueInput?.length > 0) {
          } else {
            setTranslateLabel(!translateLabel);
          }
        }}
        onBlur={() => {
          if (valueInput?.length > 0) {
          } else {
            setTranslateLabel(!translateLabel);
          }
        }}
      />
      <div className="h-6 text-base text-orange-500 ">{valueErr}</div>
      {type == "password" ? (
        <span
          className="absolute right-2 top-2 text-2xl cursor-pointer text-[#8c8c8c] "
          onClick={() => {
            setinputType(!inputType);
          }}
        >
          {inputType ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
export default memo(FormInputCustom);
