import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div
            className="h-40 flex justify-between items-center bg-black mt-20"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='ml-10'>
                <h1 className='text-3xl font-bold text-white hover:text-yellow-300 hover:underline'>h2h@gmail.com</h1>
                <p className='text-sm underline text-white'>Copyright © Here To Hear 2024</p>
            </div>

            <div className='flex text-2xl mr-10'>
                <FaFacebook className='mx-2 text-white hover:text-yellow-300' />
                <FaXTwitter className='mx-2 text-white hover:text-yellow-300' />
                <IoLogoWhatsapp className='mx-2 text-white hover:text-yellow-300' />
                <FaYoutube className='mx-2 text-white hover:text-yellow-300' />
                <FaInstagram className='mx-2 text-white hover:text-yellow-300' />
            </div>



        </div>

    )
}

export default Footer
