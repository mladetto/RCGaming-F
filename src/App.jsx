import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Product from './Components/sections/Product'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Product/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
