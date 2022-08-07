import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from "../../assets/imgs/iconHome.png" ;
const fakeAccount = { username: "admin", password: "admin" };


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
      //console.log("Username: ", val);
    } else {
      setPassword(val);
      //console.log("Password: ", val);
    }
  };
  const hanldeLogin = () => {
    console.log(username,password)
    // if(username===fakeAccount.username && password===fakeAccount.password){
    //   console.log("DANG NHAP THANH CONG!");
    //   navigate('/')

    // }
    // else{
    //   console.log("DANG NHAP KHONG THANH CONG!")
    //   alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")
    // }
    axios
      .post("https://lap-center.herokuapp.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS:", response.data);
        //localStorage gồm 4 functions chính:
        //-setItem => dùng để cài đặt tên biến và giá trị của biến 
        //-getItem=> lấy giá trị của biến cần lấy
        //-removeItem => xóa tên biến và giá trị của biến đố ra khỏi storage
        //-clear=> xóa tất cả tên biến và giá trị của nó khỏi storage
        localStorage.setItem('customerName',response.data.userName)
        localStorage.setItem('accessToken',response.data.token)
       // localStorage.setItem('')
        navigate("/");
      })
      .catch(function (error) {
        console.log("ERROR", error);
        alert(
          "Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!"
        );
      });
  };
 
  return (
    <div className="loginContainer">
    <img src={iconHome} alt="" width={45} height={48} className="iconHome" title="Trang Chủ" onClick={()=>navigate('/')}/>

      <div className="formLogin">
        <h2>Đăng nhập</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextUsername"
          >
            <Col sm="12" className="">
            <Form.Label >
              Email hoặc Số điện thoại
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email hoặc Số điện thoại"
                value={username}
                onChange={(e) => handleChange(e.target.value, "username")}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
            <Form.Label >
              Mật khẩu
            </Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" className="" onClick={hanldeLogin}>
              Đăng nhập
            </Button>{" "}
          </div>
          <p className="create" onClick={() => navigate("/register")}>
            Tạp tài khoản mới
          </p>
        </Form>
      </div>
    </div>
  );
}
