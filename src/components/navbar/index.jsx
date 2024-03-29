import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

export default function Navbar() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate= useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
    window.location.reload()
  };

  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoIcon">
        <div className="text-danger"> Navbar</div>
      </div>
      <div className="mainMenu">
        <ul className="d-flex">
          <li>
            <Link to="/">TRANG CHỦ</Link> |{" "}
          </li>

          <li>
            <Link to="/about">GIỚI THIỆU</Link>
          </li>
          <li>LIÊN HỆ</li>
          {accessToken ? (
            <li>
              <Link to="/" onClick={handleLogout}>
                ĐĂNG XUẤT
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">ĐĂNG NHẬP</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
