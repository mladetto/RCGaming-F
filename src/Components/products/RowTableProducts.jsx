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
        <td className="text-center align-content-center">{product.name}</td>
        <td className="text-center align-content-center">{product.category_id}</td>
        <td className="text-center align-content-center">{product.price}</td>
        <td className="text-center align-content-center">{product.stock}</td>
        <td className="d-flex text-center align-content-center"><img src={product.imageUrl} alt={product.name} width={80} /></td>
        <td className="text-center align-content-center">{product.outstanding ?<p>Si</p>:<p>No</p>}</td>
        <td className="text-center align-content-center">{product.stockUpdateDate}</td>
        <td className="d-flex justify-content-around">
          <Button
            className="center-buttons"
            type="button"
            variant="success"
            onClick={() => {
              handleShow(product)
            }}
          >
            Editar
          </Button>
          <Button
            className="center-buttons"
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
