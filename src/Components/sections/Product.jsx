import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Count from "../CountProduct/Count";
import { CartContext } from "../Context/CardContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Product = (currentUser) => {
    const [productsId, setProductsId] = useState([])
    const [quantityAdded, setQuantityAdded] = useState(0)
    const { id } = useParams();
    const navigate = useNavigate();

    const { addItem } = useContext(CartContext)

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getProductById();
    }, []);



    async function getProductById() {
        Swal.fire({
            title: "Cargando Producto!",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
        try {
            const resp = await axios.get(`${API}/products/${id}`);
            setProductsId(resp.data);
            Swal.close();       
        } catch (error) {
            throw new Error("Error al obtener el producto por Id" + error.message);
        }
    }


    const handledOnAdd = (quantity) => {
        if (currentUser && currentUser.currentUser && currentUser.currentUser.role === "user") {
            setQuantityAdded(quantity)
            const item = {
                _id: productsId._id,
                name: productsId.name,
                price: productsId.price,
                imageUrl: productsId.imageUrl,
            }

            addItem(item, quantity)
        } else {
            Swal.fire({
                title: 'No estás logueado',
                text: 'Por favor, inicia sesión para continuar',
                icon: 'warning',
                confirmButtonText: 'Iniciar',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
    }

    return (
        <div>
            <Container>
                <Row className="py-5">
                    <Col lg={6}>
                        <img src={productsId.imageUrl} alt={productsId.name} className="w-100" />
                    </Col>
                    <Col lg={6}>
                        <div key={productsId._id}>
                            <h3 className="mb-3 title">{productsId.name}</h3>
                            <hr />
                            <p>{productsId.description}</p>
                            <p><strong className="fs-5">Precio: </strong><span className="fs-3 price">${productsId.price}</span></p>
                            <div>
                                {
                                    productsId.stock > 0 ? (
                                        <p className="stock fs-5">Stock disponible</p>
                                    ) : (
                                        <p className="stock fs-5">No hay stock</p>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            {
                                quantityAdded > 0 ? (
                                    <Link to='/cart' className="finishB fs-4">Terminar Compra</Link>
                                ) : (
                                    <Count initial={1} stock={productsId.stock} onAdd={handledOnAdd} />
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <div className="mb-5">
                    <h3 className="title">Características</h3>
                    <hr />
                    {productsId.characteristic && productsId.characteristic.map((elem, index) => (
                        <p key={index}> - {elem}</p>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Product;