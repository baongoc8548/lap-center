import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";

import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";

const MyHistory = () => {
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
      .then(function (response) {
        const data = response.data.products;
        setData(data.reverse());
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
            Lịch sử mua hàng của{" "}
            <span className="text-success fw-bold ">{user}!</span>
          </h2>
        </div>
        {loading === false ? (
          <div>
            <div className="d-flex tb-header justify-content-between rounded-top fw-bold text-black">
              <p className="tbh-img">STT</p>
              <p className="tbh-name">Tên sản phẩm</p>
              <p className="tbh-brand">Hãng</p>
              <p className="tbh-quality">Số lượng</p>
              
            </div>
            {/* <div className="d-flex tb-body justify-content-between rounded-top fw-bold text-success p-2">
            <p className="tbh-img">Hình ảnh</p>
            <p className="tbh-name">Tên sản phẩm</p>
            <p className="tbh-brand">Hãng</p>
            <p className="tbh-price">Giá</p>
            <p className="tbh-action">Hành động</p>
        </div> */}
            {data.map((item, index) => (
              <div className="d-flex tb-body justify-content-between rounded-top fw-bold text-success p-2">
                <p className="tbb-img">{index+1}</p>

                <p className="tbh-name mt-2">{item.productName}</p>
                <p className="tbh-brand mt-2">{item.productBrand}</p>
                <p className="tbh-quality d-flex p-4">{item.quantity}</p>
                
              </div>
            ))}
            {data?.length === 0 && (
              <div className="text-center my-5 text-danger">
                <h2>Chưa từng mua sản phẩm nào!!!</h2>
              </div>
            )}
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
export default MyHistory;
