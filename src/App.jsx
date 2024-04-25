import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/pages/Home";
import Admin from "./Components/pages/Admin";
import FormCreateProduct from "./Components/products/FormCreateProduct";
import Product from "./Components/sections/Product";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import userContext from "./Components/Context/UserContext";
import { useState, useEffect } from "react";
import { CartProvider } from "./Components/Context/CardContext";
import Cart from "./Components/Cart/Cart";
import Contact from "./Components/pages/Contact";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const SaveAuth = (auth) => {
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };

  const GetAuth = () => {
    return JSON.parse(sessionStorage.getItem("auth"));
  };

  const RemoveAuth = () => {
    sessionStorage.removeItem("auth");
  };

  useEffect(() => {
    const session = GetAuth();
    if (session) {
      setCurrentUser(session);
    }
    return () => {
      setCurrentUser(undefined);
    };
  }, []);

  useEffect(() => {
    if (currentUser !== undefined) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [currentUser]);

  return (
    <>
      <userContext.Provider
        value={{ currentUser, setCurrentUser, SaveAuth, GetAuth, RemoveAuth }}
      >
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/Admin"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <Admin />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route
                path="/createProduct"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <FormCreateProduct />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route path="/products/:id" element={<Product />} />
              <Route
                path="/products/:id"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <Product />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/cart"
                element={
                  currentUser !== undefined && currentUser.role === "user" ? (
                    <Cart />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route path="/Contact" element={<Contact />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </CartProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
