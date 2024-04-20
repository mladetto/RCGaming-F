
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import clsx from "clsx";
import { Button, Form } from "react-bootstrap";


const FormCrearProducto = () => {

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;
  console.log("entro para validar");

  const esquemaProducto = Yup.object().shape({
    título: Yup.string()
      .min(4, "El título del producto tiene que tener 4 caracteres como mínimo")
      .max(40, "El título del producto puede tener 30 caracteres como máximo")
      .required("El título del producto es requerido"),
    descripción: Yup.string()
      .min(4,"La descripción del producto tiene que tener 4 caracteres como mínimo")
      .max(300,"La descripción del producto puede tener 300 caracteres como máximo")
      .required("La descripción del producto es requerida"),
    precio: Yup.number()
      .min(10, "El valor mínimo de un producto es de $100")
      .max(10000000, "El valor máximo de un producto es de $10000000")
      .required("El precio del producto es requerido"),
    categoría: Yup.string()
      .required("La categoría es requerida"),
    cantidadProductoParaAgregar: Yup.number()
      .min(1,"Se puede agregar como mínimo 1 producto al stock")
      .max(1000,"Se puede agregar como máximo 1000 productos al stock")
      .required("La cantidad de producto que se desea cargar es requerida"),
    stock: Yup.number()
      .min(0,"Puede no haber nada en el stock de productos")
      .max(500000,"La cantidad de producto en stock es de 500000")
      .required("La cantidad de producto en stock que es requerida"),
    fechaUltimoControlStock: Yup.date()
      .required("La fecha del último control del stock es requerida"),
  });

  const initialValues = {
    título: "",
    descripción: "",
    precio: "",
    categoría: "",
    cantidadProductoParaAgregar: "",
    stock: "",
    fechaUltimoControlStock: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: esquemaProducto,
    validationOnBlur: true,
    validationOnChange: true,
    onSubmit: (values) => {
        console.log("los valores del formulario son:", values);
      Swal.fire({
        title: "Estas seguro de guardar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then( async (result) => {

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
                title: "Éxito",
                text: "Se creó el producto exitosamente",
                icon: "success",
              });
              navigate("/Admin");
            }
          } catch (error) {
            console.error("Tenes un error de tipo", error);
          }
        }
      });
    },
  });

  return (
    <div className="mx-5">
      <Button
        variant="primary"
        onClick={() => {
          navigate(-1)
        }}
      >
        Atrás
      </Button>
      <div className="text-center">
        <h2>Agregar un producto</h2>
      </div>

      <Form onSubmit={formik.handleSubmit}>
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
            name="precio"
            {...formik.getFieldProps("precio")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.precio && formik.errors.precio,
              },
              {
                "is-valid": formik.touched.precio && !formik.errors.precio,
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
            type="text"
            {...formik.getFieldProps("categoría")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.categoría && formik.errors.categoría,
              },
              {
                "is-valid":
                  formik.touched.categoría && !formik.errors.categoría,
              }
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
            name="cantidadProductoParaAgregar"
            {...formik.getFieldProps("cantidadProductoParaAgregar")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.cantidadProductoParaAgregar &&
                  formik.errors.cantidadProductoParaAgregar,
              },
              {
                "is-valid":
                  formik.touched.cantidadProductoParaAgregar &&
                  !formik.errors.cantidadProductoParaAgregar,
              }
            )}
          />
          {formik.touched.cantidadProductoParaAgregar &&
            formik.errors.cantidadProductoParaAgregar && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">
                  {formik.errors.cantidadProductoParaAgregar}
                </span>
              </div>
            )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>En stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="La cantidad de productos disponible"
            name="stock"
            {...formik.getFieldProps("stock")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.stock && formik.errors.stock,
              },
              {
                "is-valid": formik.touched.stock && !formik.errors.stock,
              }
            )}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.stock}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="fechaUltimoControlStock">
          <Form.Label>Fecha de último control de stock</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingrese la fecha del último control de stock"
            name="fechaUltimoControlStock"
            {...formik.getFieldProps("fechaUltimoControlStock")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.fechaUltimoControlStock && formik.errors.fechaUltimoControlStock,
              },
              {
                "is-valid": formik.touched.fechaUltimoControlStock && !formik.errors.fechaUltimoControlStock,
              }
            )}
          />
          {formik.touched.fechaUltimoControlStock && formik.errors.fechaUltimoControlStock && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.fechaUltimoControlStock}</span>
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
