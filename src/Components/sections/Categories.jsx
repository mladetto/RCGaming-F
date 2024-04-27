import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


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
            <h2 className="pt-5 pb-4">Categorias</h2>
            <hr />
            <div className="bg-light d-flex justify-content-between py-3 px-5">
                <p className="fs-5">Filtros</p>
                <select name="" id="" className="form-control w-25">
                    <option value="">Seleccione una categoria</option>
                </select>
            </div>
            <hr />
            <div className="mb-5">
                <Row className="g-4">
                    {categories.map((elem) => (
                        <Col lg={3} xs={{ offset: 1 }} key={elem._id}>
                            <Card className="card shadow" style={{ width: '18rem' }}>
                                <Link to='/'>
                                    <Card.Img className="card-img" variant="top" src={elem.image} />
                                    <Card.Body className="">
                                        <Card.Title>{elem.name}</Card.Title>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default Categories