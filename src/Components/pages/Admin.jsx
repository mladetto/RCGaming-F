import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Administración = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Página de Administración</h1>
      </div>
      <div className="container">
        <Button
          variant="success"
          onClick={() => {
            navigate("/crear-producto");
          }}
        >Administrar productos
        </Button>
        {/* <Button
          variant="danger"
          onClick={() => {
            navigate("");
          }}
        >Administrar usuarios
        </Button> */}
      </div>
    </div>
  );
};

export default Administración;
