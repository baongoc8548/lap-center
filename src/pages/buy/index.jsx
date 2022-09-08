import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import axios from "axios";
//import img from "../../assets/imgs/laptop.png";
import { Button, Spinner } from "react-bootstrap";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
const Buy = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();
  const userId = localStorage.getItem("userId");
  const { state } = useLocation();
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/${state.id}`
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
  let checkInfo = false;
  if (!name || !phone || !email || !address) checkInfo = false;
  if (name && phone && email && address) checkInfo = true;
  const handleOrderProduct = () => {
    setLoading(true);
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        customerName: name,
        email: email,
        phone: phone,
        address: address,
        productName: product?.name,
        productBrand: product?.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then((res) => {
        // alert("Tạo đơn hàng thành công!!");
        setModalConfirm(true);
        setMessage("Tạo đơn hàng thành công!!!");
        setLoading(false);
        axios
          .post("https://lap-center.herokuapp.com/api/history/addProductToHistory", {
            userId: userId,
            phone: phone,
            address: address,
            productName: product.name,
            productBrand: product.brand,
            quantity: quantity,
          })
.then(function (response) {
            console.log('Đã thêm sản phẩm vào lịch sử mua hàng.', response);
          })
          .catch(function (error) {
            console.log('Không thể thêm sản phẩm vào lịch sử mua hàng.', error);
          });
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("Tạo đơn hàng thất bại!!!");
        setLoading(false);
      });
    setModalShow(false);
  };

  return (
    <>
      <div className="buyContainer">
        <Navbar />
        {loading === false ? (
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
            <div className="order">
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
                      type="number"
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
                  <Button
                    variant="success"
                    className=""
                    disabled={!checkInfo}
                    onClick={() => setModalShow(true)}
                  >
                    Đặt hàng
                  </Button>{" "}
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-danger"
            >
              XÁC NHẬN THÔNG TIN
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div>
                <img src={image} width={200} height={150} alt="" />
              </div>
              <div className="mx-5">
                <div>
                  <h5 className="text-danger">Thông tin sản phẩm</h5>
                  <span>Tên sản phẩm: </span>{" "}
                  <span className="fw-bold">{product?.name}</span>
                  <br />
                  <span>Hãng:</span>{" "}
                  <span className="fw-bold">{product?.brand} </span>
                  <br />
                  <span>Số lượng: </span>{" "}
                  <span className="fw-bold">{quantity}</span>
                  <br />
                  <span>Tổng tiền: </span>{" "}
                  <span className="fw-bold">{totalPrice} VNĐ </span>
                </div>
                <div className="mt-3">
                  <h5 className="text-danger">Thông tin khách hàng</h5>
                  <span>Tên Khách hàng: </span>{" "}
                  <span className="fw-bold">{name}</span>
                  <br />
                  <span>Email </span>
                  <span className="fw-bold">{email}</span>
                  <br />
                  <span>Số điện thoại: </span>{" "}
                  <span className="fw-bold">{phone}</span>
                  <br />
                  <span>Địa chỉ: </span>
                  <span className="fw-bold">{address}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOrderProduct}>Xác nhận</Button>
          </Modal.Footer>
        </Modal>
        {/* confirm */}
        <Modal
          show={modalConfirm}
          onHide={() => setModalConfirm(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Thông báo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalConfirm(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* {loading && <div style={{ marginTop: "370px" }} />} */}
    </>
  );
};
export default Buy;
