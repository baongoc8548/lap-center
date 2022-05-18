import React from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/card';
export default function Home() {
  return (
      <div>
          <Navbar/>
    <div className='d-flex flex-wrap '>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    </div>
    

    </div>
  );
}
