import React from "react";
import { Button } from 'react-bootstrap';
import './styles.scss'
export default function Card({product}) {
  console.log("product: ",product);
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
      <Button variant="primary">Xem sản phẩm</Button>{' '}
      </div>
    </div>
  );
}
