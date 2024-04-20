import './App.css'
import MapRoutes from './Routes/MapRoutes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'


function App() {


  return (
    <>
    <MapRoutes/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
