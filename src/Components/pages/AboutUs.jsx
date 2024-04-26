import imagen from "../../img/fotor_1713971778404.jpg"
import  "../pages/AboutUs.css"
import {Col} from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const AboutUs = () => {
    return (
        <>
        <Container fluid>
        <div>
            <h1 className="text-center mx-5 p-2 fw-bold" >¿Quiénes somos?</h1>
            <p className="text-center p-2 mx-3 fs-5 text-dark">Somos estudiantes de la Comisión 80i y miembros del Grupo 4.Estamos presentando nuestro proyecto final para terminar con el curso de full stcak. A continuación, les presentamos una breve descripción de cada uno:</p>
        </div>
        </Container>
        <Container className="overflow-x-hidden">
        <Row >
        <Col xs={12} md={6} lg={4}>
        <div className="text-center  my-3  container px-3">
          <img src={imagen} alt="Avatar Jimena" className="img " />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Tengo 23 años..</p>
        </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
        <div className="text-center  my-3  container px-3 ">
          <img src={imagen} alt="Avatar Jimena" className="img " />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Tengo 23 años..</p>
        </div>
        </Col>
       <Col>
        <div className="text-center  my-3  container px-3">
          <img src={imagen} alt="Avatar Jimena" className="img " />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Tengo 23 años..</p>
        </div>
        </Col>
        <Col>
        <div className="text-center  my-3  container px-3">
          <img src={imagen} alt="Avatar Jimena" className="img " />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Tengo 23 años..</p>
        </div>
        </Col>
        <Col>
        <div className="text-center  my-3  container px-3">
          <img src={imagen} alt="Avatar Jimena" className="img " />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Tengo 23 años..</p>
        </div>
        </Col>
        </Row>
        </Container>
        </>
    );
};

export default AboutUs;