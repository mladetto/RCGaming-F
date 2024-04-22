import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
/* eslint-disable react/prop-types */

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
      cancelButtonText: "NO, me equivoque",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API}/collectionProducts/`+product.id, {
            method: "DELETE",
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
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.add}</td>
        <td>{product.stock}</td>
        <td>{product.imgUrl}</td>
        <td>{product.stockControlDate}</td>
        <td>{product.outstanding}</td>
        <td className="d-flex justify-content-around">
          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("modal EDICIÓN");
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
