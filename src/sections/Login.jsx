import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";


const Login = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
 //const handleShow = () => setShow(true);

 const LoginSchema=Yup.object().shape({
  email: Yup.string().required("El email es requerido").min(8).max(125),
  password: Yup.string().required("La contraseña es requerida").min(8).max(20)
});

const initialValues={
    email:"",
    password:""
};

const Formik= useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur:true,
    validateOnChange:true,
    onSubmit:(values)=>{
        //console.log("Values-->", values);
    }
})

    return (
        <>
        //Va en el navbar
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingrese su contraseña" />
      </Form.Group>
      <Button type='submit' variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Ingresar
          </Button>
    </Form>
    </Modal.Body>
      </Modal>
    </>
    );
};

export default Login;