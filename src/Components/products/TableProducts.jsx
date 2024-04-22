import { Table } from "react-bootstrap";
import RowTableProducts from "./RowTableProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditProducts from "./ModalEditProduct";

const TableProducts = () => {
  const API = import.meta.env.VITE_API;

  const [collectionProducts, setCollectionProducts] = useState([]);
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
      const response = await axios.get(`${API}/collectionProducts`);
      const responseJson = response.data;
      setCollectionProducts(responseJson);
    } catch (error) {
      console.log("el error para traer los products es", error);
    }
  };

  useEffect(() => {
    getProducts();
    return () => {
      setCollectionProducts([]);
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
                <th>Título</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Agregar</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>último control de stock</th>
                <th>Destacado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {collectionProducts.map((element) => {

                  return (
                    <RowTableProducts
                      product={element}
                      key={element.id}
                      handleShow={handleShow}
                      getProducts={getProducts}
                    ></RowTableProducts>
                  );
                })};
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableProducts;
