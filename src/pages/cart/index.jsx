import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./style.scss";
import iconCart from "../../assets/imgs/buy1.png";
import iconDelete from "../../assets/imgs/delete1.png";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

// const fakeData = [
//   {
//     _id: "6257c89d462518002330074f",
//     userId: "617d08a5ad12171f2c494d8c",
//     productId: "60c07aaea1364c3894ac0b51",
//     productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
//     productBrand: "ACER",
//     image: "https://philong.com.vn/media/product/24366-5.jpg",
//     price: 32990000,
//     createdAt: "2022-04-14T07:09:17.158Z",
//     updatedAt: "2022-04-14T07:09:17.158Z",
//     __v: 0,
//   },
//   {
//     _id: "6298ba34505b90002306d2e3",
//     userId: "617d08a5ad12171f2c494d8c",
//     productId: "60c07aaea1364c3894ac0b51",
//     productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
//     productBrand: "ACER",
//     image: "https://philong.com.vn/media/product/24366-5.jpg",
//     price: 32990000,
//     createdAt: "2022-06-02T13:25:08.172Z",
//     updatedAt: "2022-06-02T13:25:08.172Z",
//     __v: 0,
//   },
// ];
const MyCarts = () => {
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDelete = (cardId) => {
    console.log("CARD ID:",cardId)
    setLoading(true);
    axios
      .delete(
        `https://lap-center-v1.herokuapp.com/api/cart/removeCartInCart/${cardId}`
      )
      .then(function (response) {
        setLoading(false);
        console.log("success");
        fetchAPI();
      })
      .catch(function (error) {
        setLoading(false);
        console.log("error");
      });
  };
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/cart/${userId}`)
      .then(function (response) {
        const data = response.data.products;
        setData(data);
        setLoading(false);
        console.log("success");
      })
      .catch(function (error) {
        setLoading(false);
        console.log("error");
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <div>
      <Navbar />
      
        <div className="myCartsContainer">
          <div className="abc">
            <h2 className="text-center my-4">
              Giỏ hàng của <span className="text-success fw-bold ">{user}!</span>
            </h2>
          </div>
          {loading === false ? (
          <div>
          
          <div className="d-flex tb-header justify-content-between rounded-top fw-bold text-black p-2">
            <p className="tbh-img">Hình ảnh</p>
            <p className="tbh-name">Tên sản phẩm</p>
            <p className="tbh-brand">Hãng</p>
            <p className="tbh-price">Giá</p>
            <p className="tbh-action">Hành động</p>
          </div>
          {/* <div className="d-flex tb-body justify-content-between rounded-top fw-bold text-success p-2">
            <p className="tbh-img">Hình ảnh</p>
            <p className="tbh-name">Tên sản phẩm</p>
            <p className="tbh-brand">Hãng</p>
            <p className="tbh-price">Giá</p>
            <p className="tbh-action">Hành động</p>
        </div> */}
          {data.map((item) => (
            <div className="d-flex tb-body justify-content-between rounded-top fw-bold text-success p-2">
              <img className="tbb-img" src={item.image} alt="" />
              <p className="tbh-name mt-2">{item.productName}</p>
              <p className="tbh-brand mt-2">{item.productBrand}</p>
              <p className="tbh-price mt-2 text-danger">{item.price}</p>
              <p className="tbh-action d-flex">
                <div className="d-flex bg-icon">
                  <img className="icon1" src={iconCart} alt="" />
                  <img className="icon m-lg-2" src={iconDelete} alt="" onClick={()=>handleDelete(item._id)} />
                </div>
              </p>
            </div>
          ))}
          {data?.length===0 && 
              <div className="text-center my-5 text-danger">
                <h2>Không có sản phẩm nào trong giỏ hàng!!!</h2>
              </div>
            }
          </div>
      ) : (
        <div className="text-center spin">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
        </div>
    </div>
  );
};
export default MyCarts;
