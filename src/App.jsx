import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Product from './Components/sections/Product'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'



function App() {


  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Product/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
