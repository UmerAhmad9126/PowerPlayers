import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import CreateGame from '../Pages/CreateGame'
import Room from '../Pages/Room'
import Game from '../Pages/Game'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create-game' element={<CreateGame />} />
                <Route path="/room" element={<Room />} />
                <Route path="/game" element={<Game numPlayers={2} />} />
                
            </Routes>
        </div>
    )
}

export default AllRoutes