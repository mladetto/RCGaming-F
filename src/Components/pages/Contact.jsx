import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import "../pages/Contact.css";
import { useNavigate } from 'react-router-dom';



const Contact = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <div className='p-3'>
        <h1>Contactanos</h1>
      </div>
      <div>
        <Form className='container'>
          <Form.Group className="mb-3 p-1" controlId="name">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control type="text" placeholder="Juan Perez" required minLength={6} maxLength={20} />
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="juan@gmail.com" required minLength={8} maxLength={125} />
          </Form.Group>
          <div className='mx-2 my-2'>
            <Form.Select aria-label="Default select example" required>
              <option>Seleccione el motivo de su consulta</option>
              <option value="1">Mi producto no llego</option>
              <option value="2">Devoluciones</option>
              <option value="3">Tengo problemas con mi equipo</option>
              <option value="4">Otro</option>
            </Form.Select>
          </div>
          <Form.Group className="mb-3 p-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Escriba su mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} required minLength={10} maxLength={200} />
          </Form.Group>
          <div className='container p-2 '>
            <Button type="submit" id='btn' onClick={()=> {navigate("/*")}}>
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Contact;
