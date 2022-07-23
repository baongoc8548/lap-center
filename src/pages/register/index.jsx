import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import iconHome from "../../assets/imgs/iconHome.png" ;
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  
 
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    } if (field === "password") {
      setPassword(val);
    }if (field === "email") {
      setEmail(val);
    } if(field==="phone"){
      setPhone(val);
    }
  };
  const handleRegister = () => {
   
    axios
      .post("https://lap-center-v1.herokuapp.com/api/register", {
        name: name,
        email:email,
        phone:phone,
        password:password        
      })
      .then(function (response) {
        console.log("SUCCESS:", response.data);
        alert(
          "tạo tài khoản thành công"
        )
        navigate("/login");
      })
      .catch(function (error) {
        console.log("ERROR", error);
        alert(
          "Lỗi đăng kí, xin vui lòng thử lại!!!"
        );
      });
  };
  // const handleRegister = () => {
  //   alert("tạo tài khoản thành công!");

  //   navigate("/login");
  // };

  return (
    <div className="RegisterContainer">
       <img src={iconHome} alt="" width={45} height={48} className="iconHome" title="Trang Chủ" onClick={()=>navigate('/')}/>
      <div className="formContainer">
        <h2>Đăng kí</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextname"
          >
            <Col sm="12" className="">
            <Form.Label>
              Họ tên
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ tên"
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextname"
          >
            <Col sm="12" className="">
            <Form.Label >
              Email
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e.target.value, "email")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextname"
          >
            <Col sm="12" className="">
            <Form.Label >
          Số điện thoại
            </Form.Label>
              <Form.Control
                type="Text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
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
            <Button variant="success" className="" onClick={handleRegister}>
              Đăng kí
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
