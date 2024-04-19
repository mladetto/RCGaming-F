import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Administración from './Components/pages/Admin';
import FormCrearProducto from "./Components/crud-productos/FormCrearProducto";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Admin" element={<Administración />}></Route>
          <Route path="/crear-producto" element={<FormCrearProducto />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
