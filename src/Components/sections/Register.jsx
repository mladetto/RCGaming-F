/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import { Modal, Form } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Register = ({ show, handleClose }) => {
  const API = import.meta.env.VITE_API;
  const userSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+)*$/,
        "Nombre invalido"
      )
      .trim()
      .min(8, "Nombre invalido")
      .required("El nombre es requerido"),
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Correo invalido"
      )
      .required("El correo es requerido"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
        "Contraseña invalida"
      )
      .required("La contraseña es requerida"),
    passwordRepeat: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
        "Contraseña invalida"
      )
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La contraseña es requerida"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${API}/users/create-user`, values);
        if (response.status === 201) {
          formik.resetForm();
          Swal.fire({
            title: "Exito!",
            text: "Se registro correctamente.",
            icon: "success",
          });
          handleClose();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordR, setShowPasswordR] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowPasswordR = () => {
    setShowPasswordR((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ingresa tu nombre completo"
                minLength={8}
                maxLength={100}
                required
                {...formik.getFieldProps("name")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.name && formik.errors.name,
                  },
                  {
                    "is-valid": formik.touched.name && !formik.errors.name,
                  }
                )}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                minLength={5}
                maxLength={50}
                required
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>

            <div className="d-flex flex-column flex-md-row mb-2">
              <Form.Group className="mb-1 flex-grow-1" controlId="password">
                <div className="me-md-2 ">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group ">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Ingresa la contraseña"
                      minLength={8}
                      maxLength={16}
                      required
                      pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
                      {...formik.getFieldProps("password")}
                      className={clsx(
                        "form-control",
                        {
                          "is-invalid":
                            formik.touched.password && formik.errors.password,
                        },
                        {
                          "is-valid":
                            formik.touched.password && !formik.errors.password,
                        }
                      )}
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
                </div>
              </Form.Group>
              <Form.Group className="mb-1 flex-grow-1" controlId="passwordR">
                <div className="ms-md-2 ">
                  <Form.Label>Repetir contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPasswordR ? "text" : "password"}
                      name="passwordRepeat"
                      placeholder="Ingresa la contraseña de nuevo"
                      minLength={8}
                      maxLength={16}
                      required
                      pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
                      {...formik.getFieldProps("passwordRepeat")}
                      className={clsx(
                        "form-control",
                        {
                          "is-invalid":
                            formik.touched.passwordRepeat &&
                            formik.errors.passwordRepeat,
                        },
                        {
                          "is-valid":
                            formik.touched.passwordRepeat &&
                            !formik.errors.passwordRepeat,
                        }
                      )}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={toggleShowPasswordR}
                    >
                      {showPasswordR ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                  {formik.touched.passwordRepeat &&
                    formik.errors.passwordRepeat && (
                      <div className="mt-2 text-danger fw-bolder">
                        <span role="alert">{formik.errors.passwordRepeat}</span>
                      </div>
                    )}
                </div>
              </Form.Group>
            </div>
            <Form.Text className="text-muted ">
              La contraseña debe tener al entre 8 y 16 caracteres, al menos un
              dígito, al menos una minúscula, al menos una mayúscula y al menos
              un caracter no alfanumérico.
            </Form.Text>

            <div className="mt-2">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cerrar
              </Button>
              <Button variant="primary" type="submit" className="ms-1">
                Registrarse
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
