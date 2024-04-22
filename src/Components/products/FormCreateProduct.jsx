import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import clsx from "clsx";
import { Button, Form } from "react-bootstrap";

const FormCreateProduct = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const productSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "El title del product tiene que tener 4 caracteres como mínimo")
      .max(40, "El title del product puede tener 30 caracteres como máximo")
      .required("El title del product es requerido"),
    description: Yup.string()
      .min(4,"La description del product tiene que tener 4 caracteres como mínimo")
      .max(300,"La description del product puede tener 300 caracteres como máximo")
      .required("La description del product es requerida"),
    price: Yup.number()
      .min(10, "El valor mínimo de un product es de $100")
      .max(10000000, "El valor máximo de un product es de $10000000")
      .required("El price del product es requerido"),
    category: Yup.string().required("La category es requerida"),
    add: Yup.number()
      .min(1, "Se puede agregar como mínimo 1 product al stock")
      .max(1000, "Se puede agregar como máximo 1000 products al stock")
      .required("La cantidad de product que se desea cargar es requerida"),
    // imagenFile: Yup.required("La imagen del product es requerida"),
    // .mixed()
    // .test(
    //   "file-or-url",
    //   "Debe cargar un archivo o   ingresar una URL",
    //   // function (value) {
    //   //   return value || this.parent.imgUrl;
    //   // }
    // ),
    imgUrl: Yup.string()
      .required("La imagen es requerida")
      .url("La URL de la imagen no es válida"),
    stock: Yup.number()
      .min(0, "Puede no haber nada en el stock de products")
      .max(500000, "La cantidad de product en stock es de 500000")
      .required("La cantidad de product en stock que es requerida"),
    stockControlDate: Yup.date().required(
      "La fecha del último control del stock es requerida"
    ),
    outstanding: Yup.string().required("La category es requerida"),
  });

  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    add: "",
    // imagenFile: "",
    imgUrl: "",
    stock: "",
    stockControlDate: "",
    outstanding: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: productSchema,
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${API}/collectionProducts`, {
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
          navigate(-1);
        }}
      >
        Atrás
      </Button>
      <div className="text-center">
        <h2>Agregar un producto</h2>
      </div>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            minLength={4}
            maxLength={40}
            placeholder="Ingrese el nombre"
            name="title"
            {...formik.getFieldProps("title")}
            className={clsx(
              "form-control",
              { "is-invalid": formik.touched.title && formik.errors.title },
              { "is-valid": formik.touched.title && !formik.errors.title }
            )}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.title}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripción"
            as="textarea"
            rows={2}
            minLength={4}
            maxLength={200}
            name="description"
            {...formik.getFieldProps("description")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.description && formik.errors.description,
              },
              {
                "is-valid":
                  formik.touched.description && !formik.errors.description,
              }
            )}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.description}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su precio"
            name="price"
            {...formik.getFieldProps("price")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.price && formik.errors.price,
              },
              {
                "is-valid": formik.touched.price && !formik.errors.price,
              }
            )}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.price}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="category"
            name="category"
            type="text"
            {...formik.getFieldProps("category")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.category && formik.errors.category,
              },
              {
                "is-valid":
                  formik.touched.category && !formik.errors.category,
              }
            )}
          >
            <option value="">Seleccione una categoría</option>
            <option value="placaVideo">PLACAS DE VIDEOS</option>
            <option value="notebook">NOTEBOOK</option>
            <option value="gabinetes">GABINETES</option>
          </Form.Select>
          {formik.touched.category && formik.errors.category && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.category}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="add">
          <Form.Label>Cantidad de productos para agregar al stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la cantidad"
            name="add"
            {...formik.getFieldProps("add")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.add &&
                  formik.errors.add,
              },
              {
                "is-valid":
                  formik.touched.add &&
                  !formik.errors.add,
              }
            )}
          />
          {formik.touched.add &&
            formik.errors.add && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">
                  {formik.errors.add}
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

        <Form.Group className="mb-3" controlId="imgUrl">
          <Form.Label>Imagen del producto</Form.Label>
          <div className="d-flex align-items-center">
            {/* <Form.Control
              className="me-2"
              type="file"
              name="imagenFile"
              onChange={(event) =>
                formik.setFieldValue("imagenFile", event.currentTarget.files[0])
              }
            /> */}
            <Form.Control
              type="text"
              placeholder="Ingrese la URL de la imagen"
              name="imgUrl"
              onChange={formik.handleChange}
              value={formik.values.imgUrl}
            />
          </div>
          {formik.touched.imagenFile && formik.errors.imagenFile && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.imagenFile}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="stockControlDate">
          <Form.Label>Fecha del último control de stock</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingrese la fecha del último control de stock"
            name="stockControlDate"
            {...formik.getFieldProps("stockControlDate")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.stockControlDate &&
                  formik.errors.stockControlDate,
              },
              {
                "is-valid":
                  formik.touched.stockControlDate &&
                  !formik.errors.stockControlDate,
              }
            )}
          />
          {formik.touched.stockControlDate &&
            formik.errors.stockControlDate && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">
                  {formik.errors.stockControlDate}
                </span>
              </div>
            )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="stockControlDate">
          <Form.Label>Indique si el producto es destacado</Form.Label>
          <Form.Select
            aria-label="outstanding"
            name="outstanding"
            type="text"
            {...formik.getFieldProps("outstanding")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.outstanding && formik.errors.outstanding,
              },
              {
                "is-valid":
                  formik.touched.outstanding && !formik.errors.outstanding,
              }
            )}
          >
            <option value="">Es destacado</option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </Form.Select>
          {formik.touched.outstanding && formik.errors.outstanding && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.outstanding}</span>
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

export default FormCreateProduct;
