import React from "react";
import { Button } from 'react-bootstrap';
import './styles.scss'
import { useNavigate } from "react-router-dom";
export default function Card({product}) {
  const navigate=useNavigate();
  return (
    <div className="card-product pt-2 my-4 mx-2 ml-2">
      
          <img className="img" src={product.images[0]} alt="p1" />
      
      <div className="info-product">
          <h5>{product.name}</h5>
          <p>Hãng: {product.brand}</p>
          <p>Chip: {product.cpu}</p>
          <p>Gía: {product.price}</p>
      </div>
      <div className="btn-view">
      <Button variant="primary" onClick={()=>{navigate(`/product/${product._id}`,{state:{id: product._id,brand:product.brand}})}} >Xem sản phẩm</Button>{' '}
      </div>
    </div>
  );
}
