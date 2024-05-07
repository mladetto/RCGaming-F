import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TableProducts from "../products/TableProducts";
import "./Admin.css";

const Admin = () => {

  const navigate = useNavigate();

  return (
    <Container>
      <div className="title-admin" >
        <h1>Administración de productos</h1>
      </div>
      <hr />
      <div className="container botón">
        <Button
          style={{ width: "100%" }}
          variant="success"
          onClick={() => {
            navigate("/createProduct")
          }}
        >Agregar
        </Button>
      </div>
      <hr />
      <TableProducts />
    </Container>
  );
};

export default Admin;
