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
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Correo inválido"
      )
      .min(8)
      .max(125)
      .required("El email es requerido"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
        "Contraseña inválida"
      )
      .min(8)
      .max(16)
      .required("La contraseña es requerida"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
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
          formik.resetForm();
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
        const errorMessage = error.response?.data?.message;
        if (errorMessage === "Usuario inactivo por Admin") {
          Swal.fire({
            icon: "error",
            title: "Usuario Deshabilitado",
            text: "Su cuenta está deshabilitada. Por favor, contacte con soporte.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email y/o usuario incorrecto",
          });
        }
        console.error(error);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleModalClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Modal show={isShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                minLength={8}
                maxLength={125}
                required
                {...formik.getFieldProps("email")}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.email && formik.errors.email,
                }, {
                  "is-valid": formik.touched.email && !formik.errors.email,
                })}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
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
                  {...formik.getFieldProps("password")}
                  className={clsx("form-control", {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  }, {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
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
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              )}
            </Form.Group>
            <div>
              <Button type="submit" variant="primary" className="mx-2"> Ingresar </Button>
              <Button variant="danger" className="mx-2" onClick={handleModalClose}>
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
