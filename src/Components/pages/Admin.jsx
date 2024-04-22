import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TableProducts from "../products/TableProducts";

const Admin = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Administrador</h1>
      </div>
      <div className="container">
        <Button
          variant="success"
          onClick={() => {
            navigate("/createProduct")
          }}
        >Crear un producto
        </Button>
        {/* <Button
          variant="danger"
          onClick={() => {
            navigate("");
          }}
        >Administrar usuarios
        </Button> */}
      </div>
      <TableProducts />
    </div>
  );
};

export default Admin;
