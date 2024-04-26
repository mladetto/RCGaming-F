import { Table } from "react-bootstrap";
import RowTableProducts from "./RowTableProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditProducts from "./ModalEditProduct";

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
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Url de la Imagen</th>
                <th>Características</th>
                <th>Destacado</th>
                <th>último control de stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {products.map((element) => {
                  return (
                    <RowTableProducts
                      product={element}
                      key={element.id}
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
