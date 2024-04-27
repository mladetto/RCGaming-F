import clsx from "clsx";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import UserContext from "../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isShow, handleClose }) => {
  const { setCurrentUser, SaveAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("El email es requerido").min(8).max(125),
    password: Yup.string()
      .required("La contraseña es requerida")
      .min(8)
      .max(20),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${API}/users/login`, values);
        console.log(response.data);
        if (response.status === 200) {
          SaveAuth(response.data);
          setCurrentUser(response.data);
          Formik.resetForm();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email y/o usuario incorrecto",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email y/o usuario incorrecto***",
        });
        console.error(error);
      }
    },
  });

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={Formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                {...Formik.getFieldProps("email")}
                className={clsx("Form-control", {
                  "is-invalid": Formik.touched.email && Formik.errors.email,
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                name="password"
                {...Formik.getFieldProps("password")}
                className={clsx("Form-control", {
                  "is-invalid":
                    Formik.touched.password && Formik.errors.password,
                })}
              />
            </Form.Group>
            <div>
              <Button type="submit" variant="primary" className="mx-2">
                Ingresar
              </Button>
              <Button variant="danger" className="mx-2" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <Button
            className="mx-auto btn btn-info"
            onClick={() => {
              navigate("/recovery_password");
              handleClose();
            }}
          >
            Recuperar contraseña
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
