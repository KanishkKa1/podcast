import React from 'react';
import { Link } from 'react-router-dom';

const Pick = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-serif my-10'>Are you here to tell a story or listen to one?</h1>
            </div>
            <div className='flex justify-center items-center w-[600px] h-[450px] shadow-xl'>
                <div>
                    <Link to='/speaker' className='item'><span>Speaker</span></Link>

                </div>

                <div>
                    <Link to='/listener' className='item'><span>Listener</span></Link>

                </div>
            </div>
        </div>
    );
};

export default Pick;
