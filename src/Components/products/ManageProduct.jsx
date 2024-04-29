import TableProducts from "./TableProducts";
import { Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {

    const navigate = useNavigate();

  return (
    <div>
    <Container className="d-flex justify-content-center my-3">
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          navigate("/createProduct");
        }}
      >
        Crear un producto
      </Button>
    </Container>
      <TableProducts></TableProducts>
    </div>
  );
};

export default ManageProduct;
