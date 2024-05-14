import React from 'react';
import { Link } from 'react-router-dom';

const Pick = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-serif my-10'>Are you here to tell a story or listen to one?</h1>
            </div>
            <div className='flex justify-center items-center w-8/12 h-96'>

                <Link to='/speaker' className='item w-full h-full mx-5'>
                    <div
                        className='flex justify-center items-center rounded-xl w-full h-full hover:shadow-xl hover:shadow-black'
                        style={{
                            backgroundImage: "url('/speaker.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <span className='text-4xl text-white font-bold'>Speaker</span>

                    </div>
                </Link>

                <Link to='/listener' className='item w-full h-full mx-5'>
                    <div
                        className='flex justify-center items-center w-full h-full rounded-xl hover:shadow-xl hover:shadow-black'
                        style={{
                            backgroundImage: "url('/listener.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <span className='text-4xl text-white font-bold'>Listener</span>

                    </div>
                </Link>
            </div>
        </div >
    );
};

export default Pick;
