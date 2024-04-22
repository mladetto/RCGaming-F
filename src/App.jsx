import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import userContext from "./Components/Context/UserContext"
import { useState, useEffect} from 'react'


function App() {
  const [currentUser, setCurrentUser]=useState(undefined);
  const SaveAuth=(auth)=>{
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };

  const GetAuth=()=>{
    return JSON.parse(sessionStorage.getItem("auth"))
  };


  useEffect(()=>{
    const session= GetAuth();
    if (session) {
      setCurrentUser(session)
    }
    return ()=>{
      setCurrentUser(undefined);
    } 
  }, [])

  return (
    <>
    <userContext.Provider value={{currentUser, setCurrentUser, SaveAuth, GetAuth}} >
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      </userContext.Provider>
    </>
  )
}

export default App
