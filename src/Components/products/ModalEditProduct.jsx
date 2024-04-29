/* eslint-disable react/prop-types */
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalEditProducts = ({ show, handleClose, product, getProducts }) => {
  const navigate = useNavigate();
  const [category_id, setcategory_id] = useState([]);

  useEffect(() => {
    if (product) {
      formik.setFieldValue("name", product.name, true);
      formik.setFieldValue("category_id", product.category_id, true);
      formik.setFieldValue("description", product.description, true);
      formik.setFieldValue("price", product.price, true);
      formik.setFieldValue("stock", product.stock, true);
      formik.setFieldValue("imageUrl", product.imageUrl, true);
      formik.setFieldValue("characteristic", product.characteristic, true);
      formik.setFieldValue("outstanding", product.outstanding, true);
      formik.setFieldValue("stockControlDate", product.stockControlDate, true);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}/products/categories/product`);
        setcategory_id(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const API = import.meta.env.VITE_API;

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "El título tiene que tener 4 caracteres como mínimo")
      .max(50, "El título puede tener 50 caracteres como máximo")
      .required("El título es requerido"),
    category_id: Yup.string().required("La categoría es requerida"),
    description: Yup.string()
      .min(4, "La descripción tiene que tener 4 caracteres como mínimo")
      .max(500, "La descripción puede tener 500 caracteres como máximo")
      .required("La descripción es requerida"),
    price: Yup.number()
      .min(100, "El valor mínimo es de $100")
      .max(100000000, "El valor máximo es de $100000000")
      .required("El precio es requerido"),
    stock: Yup.number()
      .min(1, "La cantidad mínima en stock es de 1 unidad")
      .max(200, "La cantidad máxima en stock es de 200")
      .required("La cantidad en stock que es requerida"),
    imageUrl: Yup.string()
      .url("La URL de la imagen no es válida")
      .required("La Url de la imagen es requerida"),
    characteristic: Yup.array()
      .of(Yup.string())
      .min(
        1,
        "Debe ingresar al menos una característica con mínimo de 4 caracteres"
      )
      .max(
        10,
        "Puede ingresar hasta 10 características con máximo de 200 caracteres"
      )
      .required("Las características son requeridas"),
    outstanding: Yup.boolean().required(
      "La indicación si el producto es destacado o no es requerida"
    ),
    stockUpdateDate: Yup.date(),
  });

  const getCurrentDate = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return currentDate;
  };

  const initialValues = {
    name: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    characteristic: [],
    outstanding: undefined,
    stockUpdateDate: getCurrentDate(),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: productSchema,
    validationOnBlur: true,
    validationOnChange: true,
    onSubmit: (values) => {
      Swal.fire({
        title: "Estas seguro en editar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.put(
              `${API}/products/update/${product._id}`,
              values
            );
            if (response.status === 201) {
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
          <Modal.Title>Producto a editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                minLength={4}
                maxLength={50}
                placeholder="Ingrese el nombre"
                name="name"
                {...formik.getFieldProps("name")}
                className={clsx(
                  "form-control",
                  { "is-invalid": formik.touched.name && formik.errors.name },
                  { "is-valid": formik.touched.name && !formik.errors.name }
                )}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="category_id">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                aria-label="category_id"
                name="category_id"
                type="text"
                {...formik.getFieldProps("category_id")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.category_id && formik.errors.category_id,
                  },
                  {
                    "is-valid":
                      formik.touched.category_id && !formik.errors.category_id,
                  }
                )}
              >
                <option value="">Seleccione una categoría</option>
                {category_id.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              {formik.touched.category_id && formik.errors.category_id && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.category_id}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripción"
                minLength={4}
                maxLength={500}
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
                type="number"
                placeholder="Ingrese el precio"
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

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>En stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad de productos en el stock"
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

            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>Url de la imagen del producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la URL de la imagen"
                name="imageUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imageUrl}
                {...formik.getFieldProps("imageUrl")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.imageUrl && formik.errors.imageUrl,
                  },
                  {
                    "is-valid":
                      formik.touched.imageUrl && !formik.errors.imageUrl,
                  }
                )}
              />
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.imageUrl}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="characteristic">
              <Form.Label>Características</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese las características (una por línea)"
                rows={4}
                name="characteristic"
                {...formik.getFieldProps("characteristic")}
                value={
                  formik.values.characteristic &&
                  formik.values.characteristic.join("\n")
                }
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.characteristic &&
                      formik.errors.characteristic,
                  },
                  {
                    "is-valid":
                      formik.touched.characteristic &&
                      !formik.errors.characteristic,
                  }
                )}
                onChange={(e) => {
                  formik.setFieldValue(
                    "characteristic",
                    e.target.value.split("\n")
                  );
                }}
              />
              {formik.touched.characteristic &&
                formik.errors.characteristic && (
                  <div className="mt-2 text-danger fw-bolder">
                    <span role="alert">{formik.errors.characteristic}</span>
                  </div>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="outstanding">
              <Form.Label>Indique si el producto es destacado</Form.Label>
              <Form.Select
                aria-label="outstanding"
                name="outstanding"
                type="boolean"
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
                <option value="true">SI</option>
                <option value="false">NO</option>
              </Form.Select>
              {formik.touched.outstanding && formik.errors.outstanding && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.outstanding}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="stockUpdateDate">
              <Form.Label>Fecha del último control de stock</Form.Label>
              <Form.Control
                type="date"
                name="stockUpdateDate"
                value={formik.values.stockUpdateDate}
                onChange={formik.handleChange}
              />
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
