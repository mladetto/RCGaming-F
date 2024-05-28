import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
export default function RecoveryPassword() {
  const API = import.meta.env.VITE_API;
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Correo invalido"
      )
      .required("El correo es requerido"),
  });
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Procesando solicitud...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const res = await axios.post(`${API}/users/recovery_password`, values);
        if (res.status === 200) {
          formik.resetForm();
          Swal.close();
          Swal.fire({
            title: "Exito!",
            text: "Se envio un email a tu correo para cambiar la contraseña.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "El correo electrónico no existe en la base de datos.",
          icon: "error",
        });
        console.error(error);
      }
    },
  });
  return (
    <div className="container my-3 py-3">
      <h2>Recuperación de contraseña</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            minLength={7}
            maxLength={50}
            required
            placeholder="Ingresa tu correo electrónico."
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
          <Form.Text className="text-muted">
            Debes ingresar el correo con el que te registraste, para poder
            blanquear la contraseña.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Recuperar
        </Button>
      </Form>
    </div>
  );
}
