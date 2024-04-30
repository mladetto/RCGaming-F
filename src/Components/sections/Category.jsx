import { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("priceAsc");
  const API = import.meta.env.VITE_API;
  const { id } = useParams();
  const categoryId = id;

  useEffect(() => {
    getProductsByCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  useEffect(() => {
    sortProducts();
  }, [sortBy]);

  console.log("productos->>",products);

  async function getProductsByCategory(categoryId) {
    try {
      const resp = await axios.get(`${API}/products/category/${categoryId}`);
      setProducts(resp.data);
      console.log("en get product by categor");
    } catch (error) {
      console.error(
        "Error al obtener los productos de la categoria" + error.message
      );
    }
  }

  function sortProducts() {
    const sortedProducts = [...filteredProducts];
    if (sortBy === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
      >
        Productos de la categoría
      </h2>

      <Form.Group controlId="formBasicSearch">
        <Form.Control
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "10px 15px",
            fontSize: "16px",
            border: "1px solid #ced4da",
            width: "100%",
            transition: "box-shadow 0.3s",
          }}
        />
      </Form.Group>

      <div
        style={{ marginTop: "20px", textAlign: "center", marginBottom: "10px" }}
      >
        <Button
          variant="outline-secondary"
          onClick={() => setSortBy("priceAsc")}
        >
          Precio ascendente
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => setSortBy("priceDesc")}
        >
          Precio descendente
        </Button>
      </div>

      <div>
        <Row className="g-4" style={{ marginTop: "20px" }}>
          {filteredProducts.map((product) => (
            <Col lg={3} md={6} key={product._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt=" "
                  style={{ objectFit: "cover", height: "200px", width: "100%" }}
                />
                <Card.Body
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    Precio: ${product.price}
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={`/products/${product._id}`}
                    className="mx-auto d-block"
                    style={{ backgroundColor: "purple" }}
                  >
                    VER MÁS
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Category;
