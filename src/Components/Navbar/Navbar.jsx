import { NavLink } from "react-router-dom";
import "../Navbar/Navbar.css";
import Login from "../sections/Login";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { currentUser, setCurrentUser, RemoveAuth } = useContext(UserContext);
  const [isShow, setIsShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleShow = () => setIsShow(true);
  const handleClose = () => setIsShow(false);
  const API = import.meta.env.VITE_API;
  const Logout = () => {
    RemoveAuth();
    setCurrentUser(undefined);
  };

  useEffect(() => {
    getCategories();
}, []);

async function getCategories() {
    try {
        const resp = await axios.get(`${API}/products/categories/product`);
        setCategories(resp.data);
    } catch (error) {
        throw new Error("Error al obtener las categorias" + error.message);
    }
}

  return (
    <>
      <Login isShow={isShow} handleClose={handleClose} />
      <nav className="navBarPage navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <h4 className="titlePage text-light">RCGames</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-light">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle text-light"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Componentes
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map((elem)=>(
                    <li>
                      <NavLink className="dropdown-item" to={`./Category/${elem._id}`}>
                     {elem.name}
                    </NavLink>
                    </li>
                  ))}
                  
                </ul>
              </li>

              <li className="nav-item" id="">
                {currentUser !== undefined && currentUser.role === "admin" && (
                  <NavLink to="/Admin" className="nav-link  text-light">
                    Administración
                  </NavLink>
                )}
              </li>

              <li className="nav-item" id="">
                {(currentUser === undefined || currentUser.role === "user") && (
                  <NavLink to="/Contact" className="nav-link  text-light">
                    Contacto
                  </NavLink>
                )}
              </li>
            </ul>

            <ul className="navbar-nav">
              <li id="btnLogueo" className="nav-item">
                {currentUser === undefined && (
                  <button
                    className="btn btn-light text-dark"
                    onClick={handleShow}
                  >
                    Iniciar Sesión
                  </button>
                )}
                {currentUser !== undefined && (
                  <button className="btn btn-light text-dark" onClick={Logout}>
                    Cerrar Sesión
                  </button>
                )}
              </li>
            </ul>

            <ul id="carrito" className="nav-item">
              {currentUser !== undefined && currentUser.role !== "admin" && (
                <NavLink to="/cart" className="nav-link text-light p-0 me-4">
                  <i className="bx bxs-cart bx-tada-hover"></i>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
