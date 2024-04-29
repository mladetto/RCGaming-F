import felix from "../../img/felix.jpeg"
import martin from"../../img/e30111ec-b5c1-439a-8cfe-3ef3adfe036d.jpeg"
import esteban from "../../img/_1e3ba369-0c65-4f60-9ee4-677660d118ab.jpg"
import jimena from "../../img/OIG3.jpeg"
import  "../pages/AboutUs.css"
import {Col} from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'


const AboutUs = () => {
    return (
        <>
        <Container fluid>
        <div>
            <h1 className="text-center mx-5 p-2 fw-bold" >¿Quiénes somos?</h1>
            <p className="text-center p-2 mx-3 fs-5 text-dark">Somos estudiantes de la Comisión 80i y miembros del Grupo 4.Estamos presentando nuestro proyecto final para terminar con el curso de full stcak. A continuación, les presentamos una breve descripción de cada uno:</p>
        </div>
        </Container>
        <Container fluid className="overflow-x-hidden">
        <Row >
        <Col xs={12} md={6} lg={4}>
        <div className="text-center  my-3 mx-3  container p-3">
          <img src={martin} alt="Avatar Martin Ladetto " className="img  rounded-circle " />
          <h5 className="my-2 fw-bold">Martin Ladetto</h5>
          <p className="text-center ">Soy Martin Ladetto, tengo 34 años, me gusta el ciclismo y los deportes al aire libre. Actualmente trabajo en una empresa en el area de IT y soy estudiante de RollingCode.</p>
        </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
        <div className="text-center  my-3 mx-3 container p-3 ">
          <img src={felix} alt="Avatar Felix Lamas" className="img rounded-circle " />
          <h5 className="my-2 fw-bold">Felix Lamas</h5>
          <p className="text-center ">Soy Felix ELoy Lamas, tengo 35 años, soy padre de dos hermosas niñas, me gusta el futbol y el ciclismo, actualmente estudiante en RollingCode y en la UNT.</p>
        </div>
        </Col>
       <Col>
        <div className="text-center  my-3 mx-3  container p-3">
          <img src={esteban} alt="Avatar Esteban Barrionuevo" className=" img rounded-circle " />
          <h5 className="my-2 fw-bold">Esteban Barrionuevo</h5>
          <p className="text-center ">Soy Esteban Barrionuevo, tengo 25 años, soy graduado en la tecnicatura en programación UTN y actualmente trabajo en Telematica como soporte IT. Mis hobbies son entrenar y jugar.</p>
        </div>
        </Col>
        <Col>
        <div className="text-center  my-3 mx-3 container p-3">
          <img src={jimena} alt="Avatar Jimena Herrera" className=" img rounded-circle" />
          <h5 className="my-2 fw-bold">Jimena Herrera</h5>
          <p className="text-center ">Soy Jimena Herrea tengo 23 años, actualmente soy estudiante de Rolling Code, mis hobbies son leer, ver series y jugar con mi perra. </p>
        </div>
        </Col>
        <Col>
        <div className="text-center  my-3 mx-3  container p-3">
          <img src={jimena} alt="Avatar Rodrigo Cardoso" className=" img rounded-circle" />
          <h5 className="my-2 fw-bold">Rodrigo Cardoso</h5>
          <p className="text-center ">Soy Rodrigo Cardoso </p>
        </div>
        </Col>
        </Row>
        </Container>
        </>
    );
};

export default AboutUs;