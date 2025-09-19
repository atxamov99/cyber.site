import React from 'react'
import IphoneImg from "../assets/IphoneImage.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="bg-[#211C24] w-[100%] h-[87vh] items-center flex justify-around text-white">
        <div className="flex flex-col space-y-2.5">
          <p className='text-[#FFFFFF] font-medium'>Pro.Beyond.</p>
          <h1 className='text-white text-5xl'>IPhone 14 <span className='font-bold'>Pro</span></h1>
          <p className='text-[#909090]'>Created to change everything for the better. For everyone</p>
          <Link to="/shop" className='bg-none border-2 border-[#FFFFFF] text-center text-white py-2 px-4 w-[150px] rounded mt-4'>Shop Now</Link>
        </div>
        <div className="">
          <img src={IphoneImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Navbar