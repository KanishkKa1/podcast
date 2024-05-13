import React from 'react'
import Nav from './Nav'
import Tiles from './Tiles'
import PeaceZone from './PeaceZone'

const Hero = () => {
    return (
        <>
            <div>
                <div>
                    <video className="inset-0 object-contain" autoPlay muted loop>
                        <source src="/main.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h1 className="text-6xl font-bold m-5">Here to Hear</h1>
                        <p className="text-2xl">A platform for you to share <span className='border-b-2'>Yourself</span></p>
                    </div>
                </div>
                <Nav />

            </div>
            <PeaceZone />
            <Tiles />
        </>
    )
}

export default Hero
