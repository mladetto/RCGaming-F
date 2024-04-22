/* eslint-disable react/prop-types */
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalEditProducts = ({
  show,
  handleClose,
  product,
  getProducts,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      formik.setFieldValue("title", product.title, true);
      formik.setFieldValue("description", product.description, true);
      formik.setFieldValue("price", product.price, true);
      formik.setFieldValue("category", product.category, true);
      formik.setFieldValue("add", product.add, true);
      formik.setFieldValue("imgUrl", product.imgUrl, true);
      formik.setFieldValue("stock", product.stock, true);
      formik.setFieldValue("stockControlDate", product.stockControlDate, true);
      formik.setFieldValue("outstanding", product.outstanding, true);
    }
  }, [product]);

  const API = import.meta.env.VITE_API;

  const productSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "El título tiene que tener 4 caracteres como mínimo")
      .max(40, "El título puede tener 30 caracteres como máximo")
      .required("El título es requerido"),
    description: Yup.string()
      .min(4, "La descripción tiene que tener 4 caracteres como mínimo")
      .max(300, "La descripción puede tener 300 caracteres como máximo")
      .required("La descripción es requerida"),
    price: Yup.number()
      .min(10, "El valor mínimo d es de $100")
      .max(10000000, "El valor máximo d es de $10000000")
      .required("El precio es requerido"),
    category: Yup.string().required("La categoría es requerida"),
    add: Yup.number()
      .min(1, "Se puede agregar como mínimo 1 producto al stock")
      .max(1000, "Se puede agregar como máximo 1000 productos al stock")
      .required("La cantidad que se desea cargar es requerida"),
    imgUrl: Yup.string()
      .required("La url de la imagen es requerida")
      .url("La url de la imagen no es válida"),
    stock: Yup.number()
      .min(0, "Puede no haber nada en el stock de productos")
      .max(500000, "La cantidad en stock es de 500000")
      .required("La cantidad en stock que es requerida"),
    stockControlDate: Yup.date().required(
      "La fecha del último control del stock es requerida"
    ),
    outstanding: Yup.string().required("La indicación si es el producto es destacado es requerida"),
  });

  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    add: "",
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
      console.log("valor de Formik", values);
      Swal.fire({
        title: "Estas seguro en editar este product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.put(
              `${API}/collectionProducts/${product.id}`,
              values
            );
            if (response.status === 200) {
              Swal.fire({
                title: "Éxito",
                text: "Se actualizó el producto correctamente",
                icon: "success",
              });
              navigate("/Admin");
              closeEditModal();
            }
          } catch (error) {
            console.error("EL ERROR QUE TENES ES: ", error);
          }
        }
      });
    },
  });

  const closeEditModal = () => {
    getProducts();
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        data-bs-theme="dark"
        className="text-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>product a Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>title del product</Form.Label>
              <Form.Control
                type="text"
                minLength={4}
                maxLength={40}
                placeholder="Ingrese aquí el title del product"
                name="title"
                {...formik.getFieldProps("title")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.title && formik.errors.title,
                  },
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
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la description del product"
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
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el price del product"
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
              <Form.Label>category</Form.Label>
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
                <option value="">Seleccione una category</option>
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

            <Form.Group
              className="mb-3"
              controlId="add"
            >
              <Form.Label>
                Cantidad de products para agregar al stock
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la cantidad de products al stock"
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
                placeholder="La cantidad de products disponible"
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
              <Form.Label>Imagen del product</Form.Label>
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
                  placeholder="URL de la imagen"
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
              <Form.Label>Fecha de último control de stock</Form.Label>
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
              <Form.Label>Indique si el product es outstanding</Form.Label>
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
                <option value="">Es outstanding?</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </Form.Select>
              {formik.touched.outstanding && formik.errors.outstanding && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.outstanding}</span>
                </div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="mx-2">
              GUARDAR
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                formik.resetForm();
                closeEditModal();
              }}
            >
              Cerrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditProducts;
