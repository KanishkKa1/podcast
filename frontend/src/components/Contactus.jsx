import React from 'react'

const Contactus = () => {
    return (
        <>
            <div id='contact' className='flex justify-center items-center w-full my-20'>
                <h1 className='text-4xl font-bold'>Don't be shy, Write to us!</h1>
            </div>
            <div className='flex justify-center items-center '>

                <div className='flex justify-center items-center w-4/5 p-5 rounded-3xl' style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"49\" viewBox=\"0 0 28 49\"%3E%3Cg fill-rule=\"evenodd\"%3E%3Cg id=\"hexagons\" fill=\"%23f3f2f5\" fill-opacity=\"0.4\" fill-rule=\"nonzero\"%3E%3Cpath d=\"M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}>
                    <div>
                        <img src='/contact-us.jpg' className='h-96' />
                    </div>

                    <div className="mx-auto w-2/5 grid grid-cols-1 gap-4">
                        <div className=" p-4">
                            <label htmlFor="email" className="block mb-2">Email:</label>
                            <input type="email" id="email" name="email" className="w-full p-2 mb-4 border-black border-2 rounded-md" placeholder="Enter your email" />

                            <label htmlFor="name" className="block mb-2">Name:</label>
                            <input type="text" id="name" name="name" className="w-full p-2 mb-4 border-black border-2 rounded-md" placeholder="Enter your name" />

                            <label htmlFor="feedback" className="block mb-2">Feedback:</label>
                            <textarea id="feedback" name="feedback" rows="4" className="w-full p-2 mb-4 border-black border-2 rounded-md" placeholder="Enter your feedback"></textarea>

                            <button className='bg-black p-4 text-white hover:bg-yellow-400 rounded-full'>Send Message</button>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Contactus
