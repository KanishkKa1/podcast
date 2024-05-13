import React from 'react'

const PeaceZone = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center my-10'>
                <h1 className='text-4xl font-bold'>Welcome To Peace Zone</h1>
            </div>

            <div className='flex justify-center items-center w-4/5'>
                <div className='w-1/2 px-10 text-xl'>
                    <p>We are here to listen to your stories, to share in your successes, and to support you through your struggles.
                        <br /><br />
                        We want to understand and learn from each other, so that we can continue to grow and build a stronger community.</p>
                </div>
                <div className='w-1/2'>
                    <img src='/peacezone-1.jpg' />
                </div>
            </div>
        </div>
    )
}

export default PeaceZone
