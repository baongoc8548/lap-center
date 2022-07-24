import React,{useState} from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import img from "../../assets/imgs/laptop.png";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, InputGroup } from "react-bootstrap";

const Buy = () => {
    const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  
 
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    } if (field === "address") {
        setAddress(val);
    }if (field === "email") {
      setEmail(val);
    } if(field==="phone"){
      setPhone(val);
    }
  };
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
            <img src={img} width={100} height={80} alt="" />
            <p>tên</p>
            <div>
              <Button className="mx-2" variant="primary">
                <i class="fa-solid fa-circle-minus"></i>
              </Button>

              <input type="number" className="inp" />
              <Button className="mx-2" v variant="primary">
                <i class="fa-solid fa-circle-plus"></i>
              </Button>
            </div>
          </div>
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
            <Col sm='12'>
              <Form.Label >Địa chỉ nhận hàng</Form.Label>
              <Form.Control
              as="textarea" rows={3}
                type="text"
                placeholder="Địa chỉ nhận hàng"
                value={address}
                onChange={(e) => handleChange(e.target.value, "address")}
              />
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" className="">
              Đặt hàng
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Buy;
