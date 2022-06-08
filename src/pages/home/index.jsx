import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import { data } from "../../data";
import { Form, Button } from "react-bootstrap";
import "./styles.scss";
import axios from "axios";

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  useEffect(() => {
    console.log("Ham nay chay dau tien");
    //fetchAPI();
    //fetchAxios();
  }, []);
  const fetchAPI = () => {
    fetch("https://reqres.in/api/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchAxios = () => {
    axios
      .get("https://lap-center.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setList(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
      })
      .then(function () {
        // always executed
      });
  };
  const handleChange = (val) => {
    //console.log("val: ", val);
    setSearch(val);

    // setList(
    //   data.filter((item) =>
    //     item?.name?.toLowerCase()?.includes(val.toLowerCase())
    //   )
    // );
  };
  const onSubmitSearch = () => {
    // setList(
    //   data.filter((item) =>
    //     item?.name?.toLowerCase()?.includes(search.toLowerCase())
    //   )
    // );
    // axios
    //   .get("https://lap-center.herokuapp.com/api/product",{
    //     params: {
    //       productName: search,
    //       productBrand:brand,
    //       orderByColumn:'price',
    //       orderByDirection:price
    //     }
    //   })
    //   .then(function (response) {
    //     // handle success
    //     console.log("SUCCESS: ", response.data);
    //     setList(response.data.products)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log("ERROR: ", error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    handleCallAPI(search, brand, price);
  };
  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);
    // setList(
    //   data.filter((item) =>
    //     item?.brand?.toLowerCase()?.includes(val.toLowerCase())
    //   )
    // );
    // console.log(e.target.value);
    // axios
    //   .get("https://lap-center.herokuapp.com/api/product",{
    //     params: {
    //       productName: search,
    //       productBrand:val,
    //       orderByColumn:'price',
    //       orderByDirection:price
    //     }
    //   })
    //   .then(function (response) {
    //     // handle success
    //     console.log("SUCCESS: ", response.data);
    //     setList(response.data.products)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log("ERROR: ", error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    handleCallAPI(search, val, price);
  };
  const sortPrice = (e) => {
    const val = e.target.value;
    // setPrice(val);

    // if (val === "1") {
    //   setList(data.sort((a, b) => a.price - b.price));
    // } else {
    //   setList(data.sort((a, b) => b.price - a.price));
    // }
    setPrice(val);
    // axios
    //   .get("https://lap-center.herokuapp.com/api/product",{
    //     params: {
    //       productName: search,
    //       productBrand:brand,
    //       orderByColumn:'price',
    //       orderByDirection:val
    //     }
    //   })
    //   .then(function (response) {
    //     // handle success
    //     console.log("SUCCESS: ", response.data);
    //     setList(response.data.products)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log("ERROR: ", error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    handleCallAPI(search, brand, val);
  };
  const handleCallAPI = (productName, productBrand, priceSort) => {
    axios
      .get("https://lap-center.herokuapp.com/api/product", {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: priceSort,
        },
      })
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setList(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="content">
        <div className="menu_left mx-3">
          <Form.Label htmlFor="inputPassword5">Tìm kiếm sản phẩm</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
            />
            <Button variant="secondary" onClick={onSubmitSearch}>
              Search
            </Button>
            {}
          </div>
          <div className="selectForm">
            <p>Hãng</p>
            <select
              className="selectBox "
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value=""></option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm">
            <p>Giá</p>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value=""></option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap list-products ">
          {list.map((item) => (
            <Card product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
