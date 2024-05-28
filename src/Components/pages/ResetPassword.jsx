import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  let control = true;
  if (token === null) {
    control = false;
  }

  const API = import.meta.env.VITE_API;
  const userSchema = Yup.object().shape({
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
    password: "",
    passwordRepeat: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Actualizando contraseña...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const response = await axios.patch(`${API}/users/reset_password`, {
          values,
          token,
          email,
        });
        if (response.status === 200) {
          formik.resetForm();
          Swal.close();
          Swal.fire({
            title: "Exito!",
            text: "Se cambio la contraseña correctamente.",
            icon: "success",
          });
          navigate("/");
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
      {control ? (
        <div className="container py-3 my-3">
          <h3>Cambio de contraseña</h3>
          <Form onSubmit={formik.handleSubmit}>
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
              <Button variant="primary" type="submit" className="ms-1">
                Guardar
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
