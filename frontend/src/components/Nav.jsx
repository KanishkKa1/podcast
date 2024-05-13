import React, { useState, useEffect } from 'react';

const Nav = () => {

    return (
        <div className='shadow-2xl p-1 w-full fixed top-0 left-0 bg-white'>
            <div className='flex justify-between mx-10 items-center p-3'>
                <div>
                    <h1 className='text-3xl font-extrabold text-yellow-400'>Here to Hear</h1>
                </div>
                <div>
                    <span className='text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white'>Home</span>
                    <span className='text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white'>Connect</span>
                    <span className='text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white'>Login</span>
                    <span className='text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white'>Contact Us</span>
                </div>
            </div>
        </div>
    );
};

export default Nav;
