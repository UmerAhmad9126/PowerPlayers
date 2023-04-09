import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import CreateGame from '../Pages/CreateGame'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create-game' element={<CreateGame />} />

            </Routes>
        </div>
    )
}

export default AllRoutes