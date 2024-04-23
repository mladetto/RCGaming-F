import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Count from "../CountProduct/Count";
import { CartContext } from "../Context/CardContext";


const Product = () => {
    const [productsId, setProductsId] = useState([])
    const [quantityAdded, setQuantityAdded] = useState(0)
    const { id } = useParams();

    const { addItem } = useContext(CartContext)

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getProductById();
    }, []);



    async function getProductById() {
        try {
            const resp = await axios.get(`${API}/products/${id}`);
            setProductsId(resp.data);
        } catch (error) {
            throw new Error("Error al obtener el producto por Id" + error.message);
        }
    }


    const handledOnAdd = (quantity) => {
        setQuantityAdded(quantity)

        const item = {
            _id: productsId._id,
            name: productsId.name,
            price: productsId.price,
            imageUrl: productsId.imageUrl,
        }

        addItem(item, quantity)
    }

    return (
        <Container>
            <Row className="border border-danger">
                <Col lg={6} className="border border-success">
                    <img src={productsId.imageUrl} alt="" />
                </Col>
                <Col lg={6} className="border border-success">
                    <div key={productsId._id}>
                        <h3>{productsId.name}</h3>
                        <p>{productsId.description}</p>
                        <p>Precio: ${productsId.price}</p>
                        <p>Stock: {productsId.stock}</p>
                        <div>
                            {
                                productsId.stock > 0 ?(
                                    <p>Stock disponible</p>
                                ):(
                                    <p>No hay stock</p>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        {
                            quantityAdded > 0 ? (
                                <Link to='/cart'>Terminar Compra</Link>
                            ) : (
                                <Count initial={1} stock={productsId.stock} onAdd={handledOnAdd} />
                            )
                        }
                    </div>
                </Col>
            </Row>
            <div>
                <h3>Características</h3>
                {productsId.characteristic && productsId.characteristic.map((elem, index) => (
                    <p key={index}>{elem}</p>
                ))}
            </div>
        </Container>
    )
}

export default Product;