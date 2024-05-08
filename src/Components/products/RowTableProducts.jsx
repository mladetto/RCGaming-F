/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const RowTableProducts = ({ product, handleShow, getProducts }) => {
  const API = import.meta.env.VITE_API;

  const deleteProduct = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`${API}/products/delete/${product._id}`, {
          headers: { "content-type": "application/json" },
        });
        getProducts();
        Swal.fire({
          title: "Éxito",
          text: "Se eliminó el producto exitosamente",
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error al eliminar el producto:", error.message);
    }
  };

  return (
    <>
      <tr className="d-flex flex-column align-items-center">
        <td>{product.name}</td>
        <td>{product.category_id.name}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>
          <img src={product.imageUrl} alt={product.name} width={80} />
        </td>
        <td>{product.outstanding ? "Si" : "No"}</td>
        <td>{product.stockUpdateDate}</td>
        <td className="d-flex flex-column align-items-center">
          <div className="mb-2 w-100">
            <Button
              className="my-1"
              type="button"
              variant="success"
              onClick={() => {
                handleShow(product);
              }}
              style={{ width: "100%" }}
            >
              Editar
            </Button>
          </div>
          <div className="w-100">
            <Button
              type="button"
              variant="danger"
              onClick={deleteProduct}
              style={{ width: "100%" }}
            >
              Eliminar
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RowTableProducts;
