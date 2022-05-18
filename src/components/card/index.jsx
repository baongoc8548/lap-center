import React from "react";
import { Button } from 'react-bootstrap';
import './styles.scss'
export default function Card() {
  return (
    <div className="card-product pt-2 my-4 mx-2">
      
          <img className="img" src={require('../../assets/imgs/p1.jpg')} alt="p1" />
      
      <div className="info-product">
          <h5>LAP ABC</h5>
          <p>Hãng: Asus</p>
          <p>Chip: Itel</p>
          <p>Gía: 1000000 VND</p>
      </div>
      <div className="btn-view">
      <Button variant="primary">Xem sản phẩm</Button>{' '}
      </div>
    </div>
  );
}
