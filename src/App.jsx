import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Admin from './Components/pages/Admin';
import FormCreateProduct from "./Components/products/FormCreateProduct";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/createProduct" element={<FormCreateProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
