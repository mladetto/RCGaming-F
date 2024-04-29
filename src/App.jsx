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
import UserList from "./Components/pages/UserList";


import Category from "./Components/sections/Category";


import ErrorPage from "./Components/pages/ErrorPage";
import RecoveryPassword from "./Components/pages/RecoveryPassword";
import ResetPassword from "./Components/pages/ResetPassword";
import Order from "./Components/pages/Order";

import ScrollToTop from "./Components/Scroll/ScrollToTop";

import OptionAdmin from "./Components/pages/OptionAdmin/OptionAdmin";



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
          <ScrollToTop />
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
                path="/option_admin"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <OptionAdmin />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/Order"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <Order />
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

<Route
                path="/UserList"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <UserList/>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route
                path="/products/:id"
                element={<Product currentUser={currentUser} />}
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


            <Route path="/categories/:id" element={<Category />} />
              <Route
                path="/categories/:id"
                element={
                  currentUser !== undefined && currentUser.role === "admin" ? (
                    <Category />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />


              <Route path="/Contact" element={<Contact />} />

              <Route path="/Category/:id" element={<Category />} />

              <Route path="/*" element={<ErrorPage/>}/>
              <Route path="/recovery_password" element={<RecoveryPassword />} />
              <Route path="/reset_password/" element={<ResetPassword />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
