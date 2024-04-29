import { Container, Button } from "react-bootstrap";
import imagen from "../../img/404final.jpg"




const ErrorPage = () => {
    return (
        <div>
            
            <Container fluid className="text-center ">
                <img src={imagen} alt="Error 404"  className="img-fluid" />
                
                <div className=" p-2 mx-2">
                
                <Button className="fs-4 text-center" variant="secondary" href="/" >Volver al Inicio</Button>
                </div>
                </Container>

            </div>
           
      
    );
};

export default ErrorPage;