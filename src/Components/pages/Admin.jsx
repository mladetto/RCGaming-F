import { Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="text-center">
        <h1>Administrador</h1>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <Button
          variant="success"
          size="lg"
          className="mx-5 my-3 px-2"
          onClick={() => {
            navigate("/manage_product")
          }}
        >Administrar los productos
        </Button>
      </div>
    </Container>
  );
};

export default Admin;
