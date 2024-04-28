import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
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
                            
                            <Link to={`./Category/${elem._id}`}>
                            <Card style={{ width: '18rem' }} onClick={() => toCategory(elem)}>
                                <Card.Img variant="top" src={elem.image} />
                                <Card.Body>
                                    <Card.Title>{elem.name}</Card.Title>
                                </Card.Body>
                            </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            
        </div>
    )
}

export default Categories;
