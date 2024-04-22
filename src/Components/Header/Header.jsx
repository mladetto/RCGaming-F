import React from 'react'
import Marquee from '../Marquee/Marquee'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <>
    <div className="sticky-top d-flex flex-column">
    <Marquee/>
    <Navbar/>
    </div>

    </>

 
  )
}

export default Header