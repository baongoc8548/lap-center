import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import axios from "axios";
//import img from "../../assets/imgs/laptop.png";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, InputGroup } from "react-bootstrap";

const Buy = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(true);
  
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/60c07aaea1364c3894ac0b51`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setTotalPrice(1 * data.price);
        setImage(data.images[0]);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
        setLoading(false);
        alert("Something went wrong!!!");
      })
      .then(function () {
        // always executed
      });
  };
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddress(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };
  const hanldeChangeQuatity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalPrice(product?.price);
    } else {
      setQuantity(val);
      setTotalPrice(val * product?.price);
    }

  };
  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
        setTotalPrice(1 * product?.price);
      } else {
        setQuantity(quantity - 1);
        setTotalPrice((quantity - 1) * product?.price);
      }
    }
  };
  useEffect(() => {
    getProductId();
  }, []);

  return (
    <div className="buyContainer">
      <Navbar />
      <div className="formBuy">
        <div>
          <b className="text-danger ">Để đặt hàng,</b>
          <span>
            quý khách vui lòng kiểm tra sản phẩm, số lượng, giá, và điền các
            thông tin dưới đây
          </span>
          <div className="d-flex justify-content-between mt-4">
            <img src={image} width={100} height={80} alt="" />
            <p className="fw-bold h4 mt-3">{product?.name}</p>
            <div className="mt-3">
              <Button
                className="mx-2"
                variant="primary"
                onClick={() => handleUpOrDownQuantity("minus")}
              >
                <i class="fa-solid fa-circle-minus"></i>
              </Button>

              <input
                type="number"
                className="inp px-2"
                value={quantity}
                onChange={(e) => hanldeChangeQuatity(e.target.value)}
              />
              <Button
                className="mx-2"
                variant="primary"
                onClick={() => handleUpOrDownQuantity("plus")}
              >
                <i class="fa-solid fa-circle-plus"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div />
          <p className="fw-bold">{product?.price} VND</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p className="fw-bold h4">Tổng tiền: </p>
          <p className="fw-bold text-danger h3">{totalPrice} VND</p>
        </div>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextname"
          >
            <Col sm="12" className="">
              <Form.Label>Họ tên</Form.Label>
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
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Số điện thoại</Form.Label>
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
              <Form.Label>Địa chỉ nhận hàng</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Địa chỉ nhận hàng"
                value={address}
                onChange={(e) => handleChange(e.target.value, "address")}
              />
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" className="" disabled={disable}>
              Đặt hàng
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Buy;
