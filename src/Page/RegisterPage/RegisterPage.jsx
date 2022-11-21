import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backGroundLogin } from "../../asset/img/linkImg";
import FormInputCustom from "../../components/Input/FormInputCustom";
import { userService } from "../../Service/UserService";

export default function RegisterPage() {
  let navigate = useNavigate();
  let [valueInput, setValueInput] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  let [errValueInput, setErrValueInput] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });
  let handleChangeValueInput = (e) => {
    let { value, name } = e.target;
    // Model check regex
    let checkRegex = (regex, message) => {
      if (regex.test(value)) {
        setErrValueInput({ ...errValueInput, [name]: "" });
      } else {
        setErrValueInput({ ...errValueInput, [name]: message });
      }
    };
    //Check Để Trống
    if (value.trim() == "") {
      setErrValueInput({
        ...errValueInput,
        [name]: ` * Vui lòng điền thông tin`,
      });
    } else {
      setErrValueInput({
        ...errValueInput,
        [name]: ``,
      });
    }
    //Check tài khoản
    if (value.length >= 1) {
      switch (name) {
        case "taiKhoan":
          {
            checkRegex(
              /^[a-zA-Z0-9_]*$/,
              "Không được chứa khoảng trắng và ký tự đặc biệt"
            );
          }
          break;
        case "matKhau":
          {
            checkRegex(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              "Tối thiểu tám ký tự, ít nhất một chữ cái và một số, không chứa kí tự đặc biệt"
            );
          }
          break;
        case "email":
          {
            checkRegex(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Email chưa đúng định dạng"
            );
          }
          break;
        case "soDt":
          {
            checkRegex(
              /(84|0[3|5|7|8|9])+([0-9]{8})+$\b/,
              "Vui lòng nhập đúng số điện thoại"
            );
          }
          break;
        case "hoTen": {
          checkRegex(
            /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
            "Họ tên phải là chữ"
          );
        }
      }
    }
    // end Check
    setValueInput({ ...valueInput, [name]: value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    for (let key in valueInput) {
      if (valueInput[key] == "") {
        isValid = false;
      }
    }
    for (let key in errValueInput) {
      if (errValueInput[key] != "") {
        isValid = false;
      }
    }
    // Kiểm tra từ sever
    if (isValid) {
      let handleRegisterUser = async (user) => {
        try {
          let res = await userService.postRegisterUser(user);
          console.log("res: ", res);

          message.success("Đăng kí thành công");
          navigate("/login");
        } catch (err) {
          if (err.response.data.content == "Email đã tồn tại!") {
            setErrValueInput({ ...errValueInput, email: "Email đã tồn tại!" });
          } else {
            setErrValueInput({
              ...errValueInput,
              taiKhoan: "Tài khoản đã tồn tại!",
            });
          }
          message.error("Đăng Kí thất bại");
        }
      };
      handleRegisterUser(valueInput);
    } else {
      message.error("đăng kí thất bại");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundLogin})`,
        backgroundSize: "150%",
        backgroundPosition: "center",
      }}
      className="relative w-screen h-screen"
    >
      {/* //LOGO LOGIN  */}
      <div
        onClick={() => {
          setTimeout(() => {
            navigate("/");
          }, 500);
        }}
        className="absolute  top-5 left-5  text-5xl   text-purple-700 font-extrabold cursor-pointer opacity-70 z-50"
      >
        BeFlox
      </div>
      <div className="flex items-center justify-center w-full h-full scale-90">
        <form className="flex items-center justify-center w-1/2 py-8  bg-[rgba(0,0,0,.75)] z-10">
          {/* ///----------- LOTIE GIF -----  */}
          {/* // form Input ---------------------- */}
          <div className="w-2/3 space-y-5">
            <h1 className="text-4xl  mb-10 text-white  font-sans">Đăng ký</h1>
            {/* USER NAME  */}
            <FormInputCustom
              name="taiKhoan"
              label="Tài khoản"
              valueInput={valueInput.taiKhoan}
              valueErr={errValueInput.taiKhoan}
              handleChangeValueInput={handleChangeValueInput}
            />
            {/* PASSWWORD  */}
            <FormInputCustom
              name="matKhau"
              label="Mật khẩu"
              valueInput={valueInput.matKhau}
              valueErr={errValueInput.matKhau}
              handleChangeValueInput={handleChangeValueInput}
              type="password"
            />
            {/* //EMAIL  */}
            <FormInputCustom
              name="email"
              label="Email"
              valueInput={valueInput.email}
              valueErr={errValueInput.email}
              handleChangeValueInput={handleChangeValueInput}
            />
            {/* //SỐ ĐIỆN THOẠI */}
            <FormInputCustom
              name="soDt"
              label="Số điện thoại"
              valueInput={valueInput.soDt}
              valueErr={errValueInput.soDt}
              handleChangeValueInput={handleChangeValueInput}
            />
            {/* //HỌ TÊN  */}
            <FormInputCustom
              name="hoTen"
              label="Họ Tên"
              valueInput={valueInput.hoTen}
              valueErr={errValueInput.hoTen}
              handleChangeValueInput={handleChangeValueInput}
            />
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
              className=" w-full  text-lg  px-4 py-4  text-white hover:text-white  bg-purple-700  hover:bg-purple-800  transition rounded-xl"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
