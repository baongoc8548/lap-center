import React, { Fragment } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";

export default function ProductDetail() {
  return (
    <>
      <Navbar />
      <div className="productDetailContainer">
        <div className="tittle">
          <h3>PRODUCT DETAIL PAGE</h3>
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
            <span className="price1">Giá bán: </span> <span className="amount">20000000 VND</span>
            <div className="gift">Khuyến mãi -Qùa tặng</div>
            <div className="giftInfo">Thông tin quà tặng</div>
            <div className="text-center">
              <button className="my-4 bg-danger">Mua ngay</button>
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
              <li>Huế  : 123 Lê Lợi</li>
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
          <tbody >
            <tr>
              <td>Model</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Ram</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td> Ổ cứng</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Card đồ họa</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>Màn hình</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    </>
  );
}
