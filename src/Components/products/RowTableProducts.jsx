import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
/* eslint-disable react/prop-types */
import axios from "axios";

const RowTableProducts = ({
  product,
  handleShow,
  getProducts,
}) => {
  const API = import.meta.env.VITE_API;

  const deleteProduct = () => {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "NO, volver atrás",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/products/delete/${product._id}`, {
            headers: { "content-type": "application/json" },
          });
          getProducts();
          Swal.fire({
            title: "Éxito",
            text: "Se eliminó el producto exitosamente",
            icon: "success"
          });
        } catch (error) {
          console.log("error:", error.message);
        }
      }
    });
  };

  return (
    <>
      <tr>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>{product.category_id}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>{product.imageUrl}</td>
        <td>{product.characteristic}</td>
        <td>{product.outstanding ?<p>Si</p>:<p>No</p>}</td>
        <td>{product.stockUpdateDate}</td>
        <td className="d-flex justify-content-around">
          <Button
            type="button"
            variant="success"
            onClick={() => {
              handleShow(product)
            }}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={deleteProduct}
          >
            Eliminar
          </Button>
        </td>
      </tr>
    </>
  );
};

export default RowTableProducts;
