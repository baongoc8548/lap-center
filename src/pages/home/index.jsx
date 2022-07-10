import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import { data } from "../../data";
import ReactPaginate from "react-paginate";
import { Form, Button, Spinner } from "react-bootstrap";
import "./styles.scss";
import axios from "axios";
import Footer from "../../components/footer";

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Ham nay chay dau tien");
    //fetchAPI();
    fetchAxios();
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
      .get("https://lap-center-v1.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setList(response.data.products);
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
    setLoading(true);
    axios
      .get("https://lap-center-v1.herokuapp.com/api/product", {
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
        setLoading(false);
        setList(response.data.products);
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
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="content">
        <div className="menu_top mx-10">
          <div className="d-flex mt-4">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
            />
            <Button
              variant="secondary"
              className="btnSearch"
              onClick={onSubmitSearch}
            >
              Tìm kiếm
            </Button>
            {}
          </div>
          <div className="selectForm">
            <p className="mt-3">
              Hãng
              <select
                className="selectBox m-lg-2 "
                value={brand}
                onChange={handleSelectChange}
              >
                <option selected value="">
                  ALL
                </option>
                <option value="Asus">ASUS</option>
                <option value="Dell">DELL</option>
                <option value="Acer">ACER</option>
                <option value="Lenovo">LENOVO</option>
              </select>
            </p>
          </div>
          <div className="selectForm">
            <p className="mt-3">
              Giá
              <select
                className="selectBox m-lg-2"
                value={price}
                onChange={sortPrice}
              >
                <option selected value="">
                  ALL
                </option>
                <option value="asc">Từ thấp đến cao</option>
                <option value="desc">Từ cao đến thấp</option>
              </select>
            </p>
          </div>
        </div>

        <div className="d-flex flex-wrap list-products justify-content-around">
          {loading === false && list.length > 0 ? (
            list.map((item) => <Card product={item} key={item.id} />)
          ) : (
            <div className="text-center">
              <Spinner animation="border" variant="danger" />
            </div>
          )}
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => console.log("eee: ", e.selected + 1)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      <Footer />
    </div>
  );
}
