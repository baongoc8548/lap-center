import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SameCard from "../../components/sameCard";

export default function ProductDetail() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { state } = useLocation();
  console.log("product Id: ", state.id);
  const [product, setProduct] = useState();
  const getProductId = () => {
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data.response);
        setProduct(response.data.response);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      <Navbar />
      <div className="productDetailContainer">
        <div className="tittle">
          <h3>{product?.name}</h3>
          <span>Tình trạng : còn hàng</span>
          <span className="mx-3">Bảo hành : 24 tháng</span>
        </div>
        <hr />
        <div className="info row">
          <div className="productImg col">
            <img
              src="https://philong.com.vn/media/product/24366-5.jpg"
              alt=""
              className="image"
            />
            <div className="text-center">
              <img
                src="https://philong.com.vn/media/product/24366-5.jpg"
                alt=""
                className="imgSmall "
              />
            </div>
          </div>
          <div className="price col">
            <span className="price1">Giá bán: </span>{" "}
            <span className="amount">{product?.price}</span>
            <div className="gift">Khuyến mãi -Qùa tặng</div>
            <div className="giftInfo">Thông tin quà tặng</div>
            <div className="text-center">
              <Button className="my-4 bg-danger">Mua ngay</Button>
              <br />
              <span>
                GỌI NGAY{" "}
                <span className="text-danger mx-2 h4"> 0964 44 2510</span> ĐỂ
                GIỮ HÀNG
              </span>
            </div>
          </div>
          <div className="contact col">
            <b>Điện thoại tư vấn -Đặt hàng</b>
            <ul>
              <li>Bảo ngọc: 01234567</li>
              <li>Đình Lộc: 01234567</li>
              <li>Me: 01234567</li>
            </ul>

            <b>Địa chỉ mua hàng</b>
            <ul>
              <li>Đà nẵng : 123 Nguyễn văn linh</li>
              <li>Huế : 123 Lê Lợi</li>
              <li>Nha Trang : 456 Phan Châu Trinh</li>
            </ul>
          </div>
        </div>
        <hr />
        <table class="table my-5 table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Phần cứng</th>
              <th scope="col">Thông số kĩ thuật</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>{product?.model}</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>{product?.cpu}</td>
            </tr>
            <tr>
              <td>Ram</td>
              <td>{product?.ram}</td>
            </tr>
            <tr>
              <td> Ổ cứng</td>
              <td>{product?.disk}</td>
            </tr>
            <tr>
              <td>Card đồ họa</td>
              <td>{product?.card}</td>
            </tr>
            <tr>
              <td>Màn hình</td>
              <td>{product?.monitor}</td>
            </tr>
          </tbody>
        </table>
        <p class='text-danger h3'>SẢN PHẨM CÙNG THƯƠNG HIỆU</p>
        <hr />
        <Carousel responsive={responsive}>
          <SameCard product={product}/>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Carousel>
        ;
      </div>
      <Footer />
    </>
  );
}
