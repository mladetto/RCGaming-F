import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Admin from './Components/pages/Admin';
import FormCreateProduct from "./Components/products/FormCreateProduct";
import Product from './Components/sections/Product'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import userContext from "./Components/Context/UserContext"
import { useState, useEffect } from 'react'
import { CartProvider } from './Components/Context/CardContext';
import Cart from './Components/Cart/Cart';
import Contact from './Components/pages/Contact';
import AboutUs from './Components/pages/AboutUs';


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const SaveAuth = (auth) => {
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };

  const GetAuth = () => {
    return JSON.parse(sessionStorage.getItem("auth"))
  };


  useEffect(() => {
    const session = GetAuth();
    if (session) {
      setCurrentUser(session)
    }
    return () => {
      setCurrentUser(undefined);
    }
  }, [])

  return (
    <>
      <userContext.Provider value={{ currentUser, setCurrentUser, SaveAuth, GetAuth }} >
        <CartProvider>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/Admin" element={<Admin />}></Route>
              <Route path="/createProduct" element={<FormCreateProduct />}></Route>
              <Route path='/products/:id' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/Contact' element={<Contact/>} />
              <Route path='/Aboutus' element={<AboutUs/>} />

            </Routes>
          </BrowserRouter>
          <Footer />
        </CartProvider>

      </userContext.Provider>
    </>
  )
}

export default App
