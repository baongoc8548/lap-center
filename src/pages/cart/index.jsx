import React from "react";
import Navbar from "../../components/navbar";
import "./style.scss";
import iconCart from '../../assets/imgs/buy1.png'
import iconDelete from '../../assets/imgs/delete1.png'
const fakeData=[
    {
        "_id": "6257c89d462518002330074f",
        "userId": "617d08a5ad12171f2c494d8c",
        "productId": "60c07aaea1364c3894ac0b51",
        "productName": "LAPTOP ACER NITRO 5 AN515-45-R0B6",
        "productBrand": "ACER",
        "image": "https://philong.com.vn/media/product/24366-5.jpg",
        "price": 32990000,
        "createdAt": "2022-04-14T07:09:17.158Z",
        "updatedAt": "2022-04-14T07:09:17.158Z",
        "__v": 0
    },
{
        "_id": "6298ba34505b90002306d2e3",
        "userId": "617d08a5ad12171f2c494d8c",
        "productId": "60c07aaea1364c3894ac0b51",
        "productName": "LAPTOP ACER NITRO 5 AN515-45-R0B6",
        "productBrand": "ACER",
        "image": "https://philong.com.vn/media/product/24366-5.jpg",
        "price": 32990000,
        "createdAt": "2022-06-02T13:25:08.172Z",
        "updatedAt": "2022-06-02T13:25:08.172Z",
        "__v": 0
    },
]
const MyCarts = () => {
    const user= localStorage.getItem("customerName")
  return (
    <div>
      <Navbar />
      <div className="myCartsContainer">
        <div className="abc">

        <h2 className="text-center my-4">Giỏ hàng của <span className="text-success fw-bold">{user}!</span></h2>
        </div>
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
        {
            fakeData.map((item)=>(
                <div className="d-flex tb-body justify-content-between rounded-top fw-bold text-success p-2">
            <img className="tbb-img"src={item.image} alt="" />
            <p className="tbh-name mt-2">{item.productName}</p>
            <p className="tbh-brand mt-2">{item.productBrand}</p>
            <p className="tbh-price mt-2 text-danger">{item.price}</p>
            <p className="tbh-action d-flex">
                <div className="d-flex bg-icon">
                    <img className="icon1" src={iconCart} alt="" />
                    <img className="icon m-lg-2" src={iconDelete} alt="" />
                </div>
            </p>
        </div>
            ))
        }
      </div>
    </div>
  );
};
export default MyCarts;
