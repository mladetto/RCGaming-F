import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [selectC, setSelectC] = useState([])
    const [filterC, setFilterC] = useState("")



  const API = import.meta.env.VITE_API;

    useEffect(() => {
        getCategories();
    }, [filterC]);

    useEffect(() => {
        getAllCategories();
    }, []);

    async function getCategories() {
        try {
            let URL = `${API}/products/categories/product`;

            if(filterC !== ""){
                URL = `${API}/products/categories/product?filterC=${filterC}`
            }

            const resp = await axios.get(URL);
            setCategories(resp.data);
        } catch (error) {
            throw new Error("Error al obtener las categorias" + error.message);
        }
    }

    async function getAllCategories(){
        try{
            const resp = await axios.get(`${API}/products/categories/product`);
            setSelectC(resp.data)
        }catch(error){
            throw new Error("Error al obtener las categorias" + error.message);
        }
    }

    return (
        <div>
            <h2 className="pt-5 pb-4 title">Categorias</h2>
            <hr />
            <div className="bg-light d-flex justify-content-between py-3 px-5">
                <p className="fs-5">Filtros</p>
                <select name="" id="" className="form-select w-50" onChange={(e)=>{
                    setFilterC(e.currentTarget.value)
                }}>
                    <option value="">Seleccione una categoria</option>
                    {selectC.map((elem)=>(
                        <option value={elem._id} key={elem._id}>{elem.name}</option>
                    ))}
                </select>
            </div>
            <hr />
            <div className="mb-5">
                <Row className="g-4 ">
                    {categories.map((elem) => (
                        <Col lg={3}  key={elem._id} className="d-flex justify-content-center">
                            <Card className="card shadow" style={{ width: '18rem' }}>
                                <Link to={`./Category/${elem._id}`}>
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

