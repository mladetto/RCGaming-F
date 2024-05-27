import { Table, Button } from "react-bootstrap";
import RowTableProducts from "./RowTableProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditProducts from "./ModalEditProduct";
import "./TableProducts.css";
import Swal from "sweetalert2";


const TableProducts = () => {
  const API = import.meta.env.VITE_API;

  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(undefined);
  const [show, setShow] = useState(false);

  const handleShow = (prod) => {
    setEditedProduct(prod);
    setShow(true);
  };

  const handleClose = () => {
    setEditedProduct(undefined);
    setShow(false);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("el error para traer los products es", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API}/products/delete/${productId}`, {
        headers: { "content-type": "application/json" },
      });
      getProducts();
      Swal.fire({
        title: "Éxito",
        text: "Se eliminó el producto exitosamente",
        icon: "success",
      });
    } catch (error) {
      console.log("Error al eliminar el producto:", error.message);
    }
  };

  return (
    <>
      <ModalEditProducts
        show={show}
        handleClose={handleClose}
        product={editedProduct}
        getProducts={getProducts}
      />
      <div className="container-fluid">
        <div className="text-center">
          <h2>Tabla de productos</h2>
        </div>
        <div className="table-responsive table-container">
          <Table bordered hover size="sm" striped="columns" responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Url de la Imagen</th>
                <th>Destacado</th>
                <th>Último control de stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <RowTableProducts
                  product={product}
                  key={index}
                  handleShow={handleShow}
                  getProducts={getProducts}
                  deleteProduct={() => deleteProduct(product._id)}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableProducts;
