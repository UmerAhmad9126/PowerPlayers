import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div >
            <div className='mt-20'>
                <h1 className='decoration-solid text-6xl font-bold text-sky-blue text-sky-400'>SOS GAME</h1>
            </div>


            <div className="rounded-lg bg-slate-600 h-40 m-auto mt-20 pt-12 pb-8 w-6/12 bg-gray.600 flex gap-8 justify-center">
                <input className='h-14 w-96 rounded-lg' type="text" placeholder='Enter the room code' />
                <button className='h-14 w-32 rounded-lg bg-cyan-500 hover:bg-cyan-600'>Join Room</button>
            </div>

            <div className="m-auto mt-16 w-6/12">
                <Link to="/create-game">
                    <button className='h-14 w-32 rounded-lg bg-cyan-500 hover:bg-cyan-600'>Create Game</button>
                </Link>
            </div>
        </div>
    )
}

export default Home 

