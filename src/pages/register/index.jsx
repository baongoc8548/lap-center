import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./style.scss";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
 
  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
    } else if (field === "password") {
      setPassword(val);
    } else {
      setConfirmPassword(val);
      console.log("PASSWORD:", val);
    }
  };
  const handleRegister = () => {
    alert("tạo tài khoản thành công!");

    navigate("/login");
  };

  return (
    <div className="RegisterContainer">
      <Navbar />
      <div className="formContainer">
        <h2>Đăng kí</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextUsername"
          >
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9" className="">
              <Form.Control
                type="text"
                placeholder="Username"
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
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Nhập lại Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Nhập lại Password"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange(e.target.value, "confirmPassword")
                }
              />
            </Col>
          </Form.Group>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              remember password
            </InputGroup>
          </div>
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
