import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import clsx from "clsx";
import { Button, Form } from "react-bootstrap";

// Producto:
// -categoriaId
// -título
// -precio
// -stock
// -imagen
// -descripcion
// -caracteristica
// -fecha de control de stock
// -destacado

  const FormCrearProducto = () => {

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const esquemaProducto = Yup.object().shape({
    título: Yup.string()
      .min(4,"El titulo del producto tiene que tener 4 caracteres como mínimo")
      .max(40,"El titulo del producto puede tener 30 caracteres como máximo")
      .required("El título del producto es requerido"),
    descripción: Yup.string()
      .min(4,"La descripción del producto tiene que tener 4 caracteres como mínimo")
      .max(300,"El titulo del producto puede tener 300 caracteres como máximo")
      .required("La descripción del producto es requerida"),
    precio: Yup.number()
      .min(2, "El precio del producto tiene que tener como mínimo 2 dígito")
      .max(7, "El precio del producto tiene que tener como máximo 7 dígito")
      .required("El precio del producto es requerido"),
    categoría: Yup.string()
      .required("La categoría es requerida"),
    cantidadProductoParaAgregar: Yup.number()
      .min(1, "La cantidad de producto tiene que tener como mínimo 1 dígito")
      .max(3, "La cantidad de producto tiene que tener como máximo 3 dígitos")
      .required("La cantidad de producto que se desea cargar es requerida"),
    stock: Yup.number()
      .min(1, "La cantidad de producto en stock tiene que tener como mínimo 1 dígito")
      .max(4, "La cantidad de producto en stock tiene que tener como máximo 4 dígitos")
      .required("La cantidad de producto en stock que es requerida"),
    fechaUltimoControlStock: Yup.date().required(
      "La fecha del último control del stock es requerida"),
  });

  const valoresIniciales = {
    título: "",
    descripción: "",
    precio: "",
    categoría: "",
    cantidadProductoParaAgregar: "",
    stock: "",
    fechaUltimoControlStock: "",
  };

  const formik = useFormik({
    validationSchema: esquemaProducto,
    valoresIniciales,
    validationOnBlur: true,
    validationOnChange: true,
    onsubmit: (values) => {
      Swal.fire({
        título: "Estas seguro de guardar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${API}/productos`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                // "Authorization": `Bearer ${currentUser}`
              },
              body: JSON.stringify(values),
            });
            if (response.status === 201) {
              formik.resetForm();
              Swal.fire({
                título: "Éxito",
                text: "Se creó el producto exitosamente",
                icon: "success",
              });
              navigate ("/Admin");
            }
          } catch (error) {
            console.error("Tenes un error de tipo", error);
          }
        }
      });
    },
  });

  return (
    <div>
      <div>
        <h1>Página de Administración</h1>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Atrás
      </Button>
      <div className="text-center">
        <h2>NUESTROS PRODUCTOS</h2>
      </div>

      <Form 
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="mb-3" controlId="título">
          <Form.Label>Título del producto</Form.Label>
          <Form.Control
            type="text"
            minLength={4}
            maxLength={40}
            placeholder="Ingrese aquí el título del producto"
            name="título"
            {...formik.getFieldProps("título")}
            className={clsx(
              "form-control",
              { "is-invalid": formik.touched.título && formik.errors.título },
              { "is-valid": formik.touched.título && !formik.errors.título }
            )}
          />
          {formik.touched.título && formik.errors.título && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.título}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="descripción">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripción del producto"
            as="textarea"
            rows={2}
            minLength={4}
            maxLength={200}
            name="descripción"
            {...formik.getFieldProps("descripción")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.descripción && formik.errors.descripción,
              },
              {
                "is-valid":
                  formik.touched.descripción && !formik.errors.descripción,
              }
            )}
          />
          {formik.touched.descripción && formik.errors.descripción && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.descripción}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el precio del producto"
            minLength={2}
            maxLength={7}
            name="precio"
            {...formik.getFieldProps("precio")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.precio && formik.errors.precio,
              },
              {
                "is-valid":
                  formik.touched.precio && !formik.errors.precio,
              }
            )}
          />
          {formik.touched.precio && formik.errors.precio && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.precio}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="categoría">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="categoría"
            name="categoría"
            {...formik.getFieldProps("categoría")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.categoría && formik.errors.categoría,
              },
              { "is-valid": formik.touched.categoría && !formik.errors.categoría }
            )}
          >
            <option value="">Seleccione una Categoría</option>
            <option value="placaVideo">PLACAS DE VIDEOS</option>
            <option value="notebook">NOTEBOOK</option>
            <option value="gabinetes">GABINETES</option>
          </Form.Select>
          {formik.touched.categoría && formik.errors.categoría && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.categoría}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="CantidadProductoParaAgregar">
          <Form.Label>Cantidad de productos para agregar al stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la cantidad de productos al stock"
            minLength={1}
            maxLength={3}
            name="cantidadProductoParaAgregar"
            {...formik.getFieldProps("cantidadProductoParaAgregar")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.cantidadProductoParaAgregar && formik.errors.cantidadProductoParaAgregar,
              },
              {
                "is-valid":
                  formik.touched.cantidadProductoParaAgregar && !formik.errors.cantidadProductoParaAgregar,
              }
            )}
          />
          {formik.touched.cantidadProductoParaAgregar && formik.errors.cantidadProductoParaAgregar && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.cantidadProductoParaAgregar}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>En stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="La cantidad de productos disponible"
            minLength={1}
            maxLength={4}
            name="stock"
            {...formik.getFieldProps("stock")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.stock && formik.errors.stock,
              },
              {
                "is-valid":
                  formik.touched.stock && !formik.errors.stock,
              }
            )}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.stock}</span>
            </div>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          GUARDAR
        </Button>
      </Form>
    </div>
  );
};

export default FormCrearProducto;