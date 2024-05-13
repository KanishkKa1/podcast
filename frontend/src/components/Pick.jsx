import React from 'react';
import { Link } from 'react-router-dom';

const Pick = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-serif my-10'>Are you here to tell a story or listen to one?</h1>
            </div>
            <div className='flex justify-center items-center'>
                <section>
                    <Link to='/speaker' className='item'><span>Speaker</span></Link>
                    <Link to='/listener' className='item'><span>Listener</span></Link>
                </section>
            </div>
        </>
    );
};

export default Pick;
