import React from 'react'
import Logo from '../assets/Logo.png'
import IphoneImg from '../assets/IphoneImage.png'

import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { CiUser } from "react-icons/ci";

const Header = () => {
  return (
    <header>
      <nav className='max-w-[1200px] mx-auto px-4 flex justify-between items-center h-16'>
        <div className='text-lg font-bold'><img src={Logo} alt="" /></div>
        <div className="bg-[#F5F5F5] text-[#656565] flex items-center px-6 py-2 rounded focus:border-0 border-[#F5F5F5]">
          <CiSearch />
          <input type="text" placeholder='Search...' className='bg-[#F5F5F5] pl-1.5 text-[#656565] outline-none border-none' />
        </div>
        <ul className='flex space-x-4'>
          <li className='cursor-pointer text-[#656565] hover:text-black transition-colors'>Home</li>
          <li className='cursor-pointer text-[#656565] hover:text-black transition-colors'>About</li>
          <li className='cursor-pointer text-[#656565] hover:text-black transition-colors'>Contact Us</li>
          <li className='cursor-pointer text-[#656565] hover:text-black transition-colors'>Blog</li>
        </ul>
        <ul className='flex space-x-4'>
          <li className='cursor-pointer text-2xl text-[#656565] hover:text-black transition-colors'><CiHeart /></li>
          <li className='cursor-pointer text-2xl text-[#656565] hover:text-black transition-colors'><SlBasket /></li>
          <li className='cursor-pointer text-2xl text-[#656565] hover:text-black transition-colors'><CiUser /></li>
        </ul>
      </nav>

      <div className="bg-[#211C24] w-[100%] h-[87vh] items-center flex justify-around text-white">
        <div className="flex flex-col space-y-2.5">
          <p className='text-[#FFFFFF] font-medium'>Pro.Beyond.</p>
          <h1 className='text-white text-5xl'>IPhone 14 <span className='font-bold'>Pro</span></h1>
          <p className='text-[#909090]'>Created to change everything for the better. For everyone</p>
          <button className='bg-none border-2 border-[#FFFFFF] text-white py-2 px-4 w-[150px] rounded mt-4'>Shop Now</button>
        </div>
        <div className="">
          <img src={IphoneImg} alt="" />
        </div>
      </div>
    </header>
  )
}

export default Header