import React from 'react'
import Home from "../Pages/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const MapRoutes = () => {
  return (
<BrowserRouter>
<Routes>
    <Route path='/' element={<Home/>}>

    </Route>
</Routes>
</BrowserRouter>
  )
}

export default MapRoutes