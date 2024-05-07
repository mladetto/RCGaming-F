import clsx from "clsx";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import UserContext from "../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
      Swal.fire({
        title: "Iniciando sesión...!",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const response = await axios.post(`${API}/users/login`, values);
        if (response.status === 200) {
          SaveAuth(response.data);
          setCurrentUser(response.data);
          Formik.resetForm();
          Swal.close();
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
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
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
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  name="password"
                  minLength={8}
                  maxLength={16}
                  required
                  {...Formik.getFieldProps("password")}
                  className={clsx("Form-control", {
                    "is-invalid":
                      Formik.touched.password && Formik.errors.password,
                  })}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
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
