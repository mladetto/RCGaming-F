import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';


const Categories = () => {
    const [categories, setCategories] = useState([])


    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        try {
            const resp = await axios.get(`${API}/products/categories/product`);
            setCategories(resp.data);
        } catch (error) {
            throw new Error("Error al obtener las categorias" + error.message);
        }
    }


    return (
        <div>
            <h2>Categorias</h2>
            <div className="bg-light">
                <p>Filtros</p>
            </div>
            <div>
                <Row className="g-4">
                    {categories.map((elem) => (
                        <Col lg={3} xs={{ offset: 1 }} key={elem._id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={elem.image} />
                                <Card.Body>
                                    <Card.Title>{elem.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default Categories