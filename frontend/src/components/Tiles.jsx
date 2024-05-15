import React from 'react';

const Tiles = () => {
    return (
        <>
            <div id='connect' className='flex justify-center items-center mt-20 '>
                <h1 className='text-4xl font-bold'>Connect</h1>
            </div>
            <div className="flex justify-center items-start mt-10 w-full">

                <div>
                    <div className="bg-yellow-100 p-4 m-2">
                        <img src="/connect1.jpeg" alt="Image 1" className="w-[500px] object-cover mb-2" />
                        <p className='font-bold'>Endless Communication</p>
                        <p className='text-pink-400'>Talks and Talks</p>
                    </div>
                    <div className="bg-emerald-50 p-4 m-2">
                        <img src="connect2.jpeg" alt="Image 2" className="w-[500px] object-contain mb-2" />
                        <p className='font-bold'>Keep your mind fresh</p>
                        <p className='text-green-600'>Live with Nature</p>
                    </div>
                </div>
                <div>

                    <div className="bg-slate-100 p-4 m-2">
                        <img src="connect4.jpeg" alt="Image 4" className=" w-[500px] object-cover mb-2" />
                        <p className='font-bold'>Work on yourself</p>
                        <p className='text-yellow-500'>Explore within</p>
                    </div>
                    <div className="bg-purple-200 p-4 m-2">
                        <img src="connect3.jpeg" alt="Image 3" className=" w-[500px] object-cover mb-2" />
                        <p className='font-bold'>Write a Note for Yourself</p>
                        <p className='text-blue-500'>Graphics and Doodling</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tiles;