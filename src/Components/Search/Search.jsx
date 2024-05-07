import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import "../Navbar/Navbar.css";
import "./Search.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API = import.meta.env.VITE_API;

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filteredResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchWord, products]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="search-container pt-3">
      <nav className="navBarPage">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center">
          <nav className="mb-2 mb-md-0 mx-3">
            <Link to="/*">
              <FaFacebookSquare className="icons mx-3 face" />
            </Link>
            <Link to="/*">
              <FaTwitterSquare className="icons mx-3 twitter" />
            </Link>
            <Link to="/*">
              <FaWhatsappSquare className="icons mx-3 wp" />
            </Link>
          </nav>

          <div className="search-form">
            <Form className="d-flex flex-row align-items-center">
              <Form.Group controlId="searchHeader">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                    value={searchWord}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            {searchWord && (
              <ul className="search-results">
                {searchResults.map((product, index) => (
                  <li key={index}>
                    <Link
                      to={`/products/${product._id}`}
                      onClick={() => setSearchWord("")}
                      className="text-decoration-none text-dark"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Search;
