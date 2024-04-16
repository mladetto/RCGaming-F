import React from 'react'
import "../Navbar/Navbar.css"

const Navbar = () => {
  
  return (
    <>
    <nav className="navBarPage navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <h4 className="titlePage text-light">RCGames</h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="!#">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="!#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Componentes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="!#">Procesadores</a></li>
                  <li><a className="dropdown-item" href="!#">Mothers</a></li>
                  <li><a className="dropdown-item" href="!#">Placas de video</a></li>
                  <li><a className="dropdown-item" href="!#">Almacenamiento</a></li>
                  <li><a className="dropdown-item" href="!#">Gabinetes</a></li>
                  <li><a className="dropdown-item" href="!#">Fuentes</a></li>
                  <li><a className="dropdown-item" href="!#">Memoria Ram</a></li>
                  <li><a className="dropdown-item" href="!#">Coolers</a></li>
                  <li><a className="dropdown-item" href="!#">Monitores</a></li>
                </ul>
              </li>
                
              <li className="nav-item" id="">
                <a className="nav-link text-light" aria-current="page" href="!#">Administracion</a>
              </li>
  
            </ul>
  
            <ul className="navbar-nav">
            <li id="btnLogueo"  className="nav-item">
              <a className="nav-link text-light" href="!#">Iniciar Sesión</a>
            </li>
             
          </ul>
  
          <ul id="carrito" className="nav-item">
               <a className="nav-link text-light p-0 me-4" aria-current="page" href="!#"><i
                  className='bx bxs-cart bx-tada-hover'></i></a>
                
          </ul>
   
        </div>
  
      </div>
   </nav>
    </>
  )
}

export default Navbar