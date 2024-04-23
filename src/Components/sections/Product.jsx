import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Count from "../CountProduct/Count";


const Product = () => {
    const [productsId, setProductsId] = useState([])
    const { id } = useParams();

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

    console.log(productsId);

    return (
        <Container>
            <Row className="border border-danger">
                <Col lg={6} className="border border-success">
                    <img src={productsId.imageUrl} alt="" />
                </Col>
                <Col lg={6} className="border border-success">
                    <div>
                        <h3>{productsId.name}</h3>
                        <p>{productsId.description}</p>
                        <p>Precio: ${productsId.price}</p>
                        <p>Stock: {productsId.stock}</p>
                    </div>
                    <div>
                        <Count initial={1} stock={productsId.stock} />
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