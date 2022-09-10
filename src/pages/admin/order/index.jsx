
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import "./styles.scss";
import iconEyes from "../../../assets/imgs/eye-care.png";
import iconDelete from "../../../assets/imgs/delete1.png";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
const Orders=()=> {
    const user = localStorage.getItem("customerName");
    const userId = localStorage.getItem("userId");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
    const handleShowOrderStatus=(orderStatus)=>{
        if(orderStatus === 1) {
            return 'Vừa đặt hàng'
          }
          if(orderStatus === 2) {
            return 'Đang giao hàng'
          }
          if(orderStatus === 3) {
            return 'Đã nhận hàng'
          }
          if(orderStatus === 4) {
            return 'Đã trả hàng'
          }
    }
    const handleShowColorOrderStatus = (orderStatus) => {
        if(orderStatus === 1) {
          return 'text-warning'
        }
        if(orderStatus === 2) {
          return 'text-primary'
        }
        if(orderStatus === 3) {
          return 'text-info'
        }
        if(orderStatus === 4) {
          return 'text-danger'
        }
      }
    const fetchAPI = () => {
      setLoading(true);
      axios
        .get(`https://lap-center.herokuapp.com/api/order`)
        .then(function (response) {
          const data = response.data.orders;
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
        
          <div className="orderContainer">
            <div className="abc">
              <h2 className="text-center my-4">
                Quản lí đơn hàng
              </h2>
            </div>
            {loading === false ? (
            <div>
            
            <div className="d-flex tb-header justify-content-between rounded-top fw-bold text-black p-2">
             
              <p className="tbh-name">Tên khách hàng</p>
              <p className="tbh-brand">Tên sản phẩm</p>
              <p className="tbh-quantity">Số lượng</p>

              <p className="tbh-price">Trạng thái</p>
              <p className="tbh-action">Hành động</p>
            </div>
            
            {data.map((item) => (
              <div className="d-flex tb-body justify-content-between rounded-top fw-bold p-2">
                
                <p className="tbh-name mt-2">{item.customerName}</p>
                <p className="tbh-brand">{item.productName}</p>
                <p className="tbh-quantity">{item.quantity }</p>

                <p className={`tbh-price ${handleShowColorOrderStatus(item.orderStatus)}`}>{handleShowOrderStatus(item.orderStatus)}</p>
                <p className="tbh-action d-flex">
                  <div className="d-flex bg-icon">
                    <img className="icon1" src={iconEyes} alt="" onClick={() => {
                        navigate(`/buy/${item.productId}`, {
                          state: { id: item.productId },
                        });
                      }} />
                    <img className="icon m-lg-2" src={iconDelete} alt="" onClick={()=>handleDelete(item._id)} />
                  </div>
                </p>
              </div>
            ))}
        <div className="my-5"></div>
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
export default Orders;
