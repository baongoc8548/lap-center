import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import "./styles.scss";
import iconEyes from "../../../assets/imgs/eye-care.png";
import iconDelete from "../../../assets/imgs/delete1.png";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [dataItem, setDataItem] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/order`)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Orders: ", data);
        setData(data.reverse());
        setLoading(false);
        setTotalPage(response.data.totalPage);

      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };

  const handleDelete = (orderId) => {
    console.log("CART IDddddddd: ", orderId);
    setLoading(true);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/order/removeOrder/${orderId}`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setLoading(false);
        setModalConfirm(true);
        setMessage("Đã xóa sản phẩm khỏi danh sách đơn hàng.");
        fetchAPI();
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        setModalConfirm(true);
        setMessage("Lỗi. Không thể xóa sản phẩm khỏi danh sách đơn hàng.");
        console.log(error);
      });
  };

  const handleShowOrderStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "Vừa đặt hàng";
    }
    if (orderStatus === 2) {
      return "Đang giao hàng";
    }
    if (orderStatus === 3) {
      return "Đã nhận hàng";
    }
    if (orderStatus === 4) {
      return "Đã trả hàng";
    }
  };

  const handleShowColorOrderStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "text-success";
    }
    if (orderStatus === 2) {
      return "text-primary";
    }
    if (orderStatus === 3) {
      return "text-info";
    }
    if (orderStatus === 4) {
      return "text-danger";
    }
  };

  const handleChooseItem = (item) => {
    setDataItem(item);
    setModalShow(true);
    setSelectedStatus(item.orderStatus);
  };

  const handleSelectChange = (event) => {
    // parseInt => chuyển kiểu dữ liệu từ string sang number (integer)
    setSelectedStatus(parseInt(event.target.value));
    console.log(parseInt(event.target.value));
  };

  const handleUpdateOrderStatus = () => {
    setLoading(true);
    axios
      .patch(
        `https://lap-center.herokuapp.com/api/order/editOrderStatus/${dataItem._id}`,
        {
          orderStatus: selectedStatus,
        }
      )
      .then(function (response) {
        setModalConfirm(true);
        setMessage("Cập nhật trạng thái đơn hàng thành công!");
        setLoading(false);
        console.log(response);
        setModalShow(false);
        fetchAPI();
      })
      .catch(function (error) {
        setModalConfirm(true);
        setMessage("Cập nhật trạng thái đơn hàng không thành công!");
        setLoading(false);
        setModalShow(false);
        console.log(error);
      });
  };
  const handleChangePage = (pageNumber) => {
    console.log("PAGE NUMBER: ", pageNumber);
    setPage(pageNumber);
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/order?pageSize=24&pageNumber=${pageNumber}`
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESSssssssssssssssssss: ", response.data);
        setLoading(false);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
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
  useEffect(() => {
    fetchAPI();
  }, []);

  // return (
  //   <>
  //     <Navbar />
  //     <div className="ordersContainer">
  //       <h3 className="text-center my-4">Quản lý đơn hàng </h3>
  //       {loading ? (
  //         // LOADING
  //         <div className="text-center">
  //           <Spinner animation="border" variant="primary" />
  //         </div>
  //       ) : (
  //         <div>
  //           {/* CUSTOMIZE TABLE HEADER */}
  //           <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
  //             <p className="tbh-name">Tên khách hàng</p>
  //             <p className="tbh-brand">Tên sản phẩm</p>
  //             <p className="tbh-price">Số lượng</p>
  //             <p className="tbh-price">Trạng thái</p>
  //             <p className="tbh-actions">Hành động</p>
  //           </div>
  //           {/* CUSTOMIZE TABLE BODY */}
  //           {/* LOOP DATA */}
  //           {data.map((item) => (
  //             <div className="d-flex tb-body fw-bold  justify-content-between border-top-0 border-success">
  //               <p className="tbh-name mt-2">{item.customerName}</p>
  //               <p className="tbh-brand mt-2">{item.productName}</p>
  //               <p className="tbh-price text-danger mt-2">{item.quantity}</p>
  //               <p
  //                 className={`tbh-price mt-2 ${handleShowColorOrderStatus(
  //                   item.orderStatus,
  //                 )}`}
  //               >
  //                 {handleShowOrderStatus(item.orderStatus)}
  //               </p>
  //               <div className="tbh-actions d-flex mt-2">
  //                 <div
  //                   className="bg-icon"
  //                   onClick={() => handleDelete(item._id)}
  //                 >
  //                   <img className="icon" src={iconDelete} alt="" />
  //                 </div>
  //                 <div
  //                   className="bg-icon"
  //                   onClick={() => handleChooseItem(item)}
  //                 >
  //                   <img className="icon" src={iconEyes} alt="" />
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //           <div className="my-5" />
  //           {data?.length === 0 && (
  //             <div className="text-center mt-2">
  //               <p>Không có sản phẩm nào trong giỏ hàng!!!</p>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //     <Modal
  //       show={modalShow}
  //       onHide={() => setModalShow(false)}
  //       backdrop="static"
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title
  //           id="contained-modal-title-vcenter"
  //           className="text-danger"
  //         >
  //           Xác nhận thông tin
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <div className="d-flex">
  //           <p>Tên khách hàng:</p>
  //           <span className="mx-2 fw-bold">{dataItem?.customerName}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Tên sản phẩm:</p>
  //           <span className="mx-2 fw-bold">{dataItem?.productName}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Hãng:</p>
  //           <span className="mx-2 fw-bold">{dataItem?.productBrand}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Số lượng:</p>
  //           <span className="mx-2 fw-bold"> {dataItem?.quantity}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Số điện thoại:</p>
  //           <span className="mx-2 fw-bold">{dataItem?.phone}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Địa chỉ:</p>
  //           <span className="mx-2 fw-bold">{dataItem?.address}</span>
  //         </div>
  //         <div className="d-flex">
  //           <p>Trạng thái đơn hàng:</p>
  //           <select
  //             value={selectedStatus}
  //             onChange={handleSelectChange}
  //             className="select-status"
  //           >
  //             <option value="1">Vừa đặt hàng</option>
  //             <option value="2">Đang giao hàng</option>
  //             <option value="3">Đã nhận hàng</option>
  //             <option value="4">Đã trả hàng</option>
  //           </select>
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button
  //           className="btn-success"
  //           onClick={handleUpdateOrderStatus}
  //           // onClick={() => handleUpdateOrderStatus()}
  //         >
  //           Cập nhật
  //         </Button>
  //         <Button className="btn-secondary" onClick={() => null}>
  //           Huỷ
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //     {/* Confirm modal */}
  //     <Modal
  //       show={modalConfirm}
  //       onHide={() => setModalConfirm(false)}
  //       size="md"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Thông báo
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <p>{message}</p>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button
  //           onClick={() => setModalConfirm(false)}
  //           className="btn-success"
  //         >
  //           Đóng
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // )
  return (
    <div>
      <Navbar />

      <div className="orderContainer">
        <div className="abc">
          <h2 className="text-center my-4">Quản lí đơn hàng</h2>
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

            {data?.map((item) => (
              <div
                key={item._id}
                className="d-flex tb-body justify-content-between rounded-top fw-bold p-2"
              >
                <p className="tbh-name mt-2">{item.customerName}</p>
                <p className="tbh-brand">{item.productName}</p>
                <p className="tbh-quantity">{item.quantity}</p>

                <p
                  className={`tbh-price ${handleShowColorOrderStatus(
                    item.orderStatus
                  )}`}
                >
                  {handleShowOrderStatus(item.orderStatus)}
                </p>
                <p className="tbh-action d-flex">
                  <div className="d-flex bg-icon">
                    <img
                      className="icon1"
                      src={iconEyes}
                      alt=""
                      onClick={() => handleChooseItem(item)}
                    />
                    <img
                      className="icon m-lg-2"
                      src={iconDelete}
                      alt=""
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </p>
              </div>
            ))}
            <div className="my-5"></div>
            {data?.length === 0 && (
              <div className="text-center my-5 text-danger">
                <h2>Không có sản phẩm nào trong giỏ hàng!!!</h2>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center spin">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-danger"
          >
            Xác nhận thông tin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mx-3">
            <div className="d-flex">
              <p>Tên khách hàng:</p>
              <span className="fw-bold">{dataItem?.customerName}</span>
            </div>
            <div className="d-flex">
              <p>Tên sản phẩm:</p>
              <span className=" fw-bold">{dataItem?.productName}</span>
            </div>
            <div className="d-flex">
              <p>Hãng:</p>
              <span className="fw-bold">{dataItem?.productBrand}</span>
            </div>
            <div className="d-flex">
              <p>Số lượng:</p>
              <span className="fw-bold"> {dataItem?.quantity}</span>
            </div>
            <div className="d-flex">
              <p>Số điện thoại:</p>
              <span className="fw-bold">{dataItem?.phone}</span>
            </div>
            <div className="d-flex">
              <p>Địa chỉ:</p>
              <span className="fw-bold">{dataItem?.address}</span>
            </div>
            <div className="d-flex">
              <p>Trạng thái đơn hàng:</p>
              <select
                value={selectedStatus}
                // value={selectedStatus}
                onChange={handleSelectChange}
                className="select-status"
              >
                <option value="1">Vừa đặt</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã nhận</option>
                <option value="4">Gửi trả</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-suscess" onClick={handleUpdateOrderStatus}>
            Cập nhật
          </Button>
          <Button className="btn-warning" onClick={() => null}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalConfirm}
        onHide={() => setModalConfirm(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông báo
          </Modal.Title>
        </Modal.Header.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalConfirm(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => handleChangePage(e.selected + 1)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Orders;
