import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormCrearProducto from "../../Components/crud-productos/FormCrearProducto";

const Administración = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <Button
          variant="success"
          onClick={() => {
            navigate("/crear-producto");
          }}
        ></Button>
      </div>
      <FormCrearProducto></FormCrearProducto>
    </div>
  );
};

export default Administración;
