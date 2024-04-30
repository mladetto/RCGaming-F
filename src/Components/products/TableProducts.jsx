/* eslint-disable react/jsx-no-duplicate-props */
import { Table } from "react-bootstrap";
import RowTableProducts from "./RowTableProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditProducts from "./ModalEditProduct";
import "./TableProducts.css";

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
      console.log("el error para traer los products es", error);
    }
  };

  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
    };
  }, []);


  return (
    <>
      <ModalEditProducts
        show={show}
        handleClose={handleClose}
        product={editedProduct}
        getProducts={getProducts}
      ></ModalEditProducts>
      <div className="container-fluid">
        <div className="text-center">
          <h2>Tabla de productos</h2>
        </div>
        <div className="table-responsive table-container">
          <Table bordered hover size="sm" striped="columns">
            <thead>
              <tr>
                <th className="text-center align-content-center">Nombre</th>
                <th className="text-center align-content-center">Categoría</th>
                <th className="text-center align-content-center">Precio</th>
                <th className="text-center align-content-center">Stock</th>
                <th className="text-center align-content-center">Imagen</th>
                <th className="text-center align-content-center">Destacado</th>
                <th className="text-center align-content-center">Último control de stock</th>
                <th className="text-center align-content-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {products.map((product,index) => {
                  return (
                    <RowTableProducts
                      product={product}
                      key={index}
                      handleShow={handleShow}
                      getProducts={getProducts}
                    ></RowTableProducts>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableProducts;
