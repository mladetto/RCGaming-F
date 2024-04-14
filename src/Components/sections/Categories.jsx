import { Col, Row } from "react-bootstrap"


const Categories = () => {


    return (
        <div>
            <h2>Categorias</h2>
            <div className="bg-light">
                <p>Filtros</p>
            </div>
            <div>
                <Row className="g-4">
                    <Col lg={3} className="bg-danger" xs={{ offset: 1 }}>
                        hola
                    </Col>
                    <Col lg={3} className="bg-danger" xs={{ offset: 1 }}>
                        hola
                    </Col>
                    <Col lg={3} className="bg-danger" xs={{ offset: 1 }}>
                        hola
                    </Col>
                    <Col lg={3} className="bg-danger" xs={{ offset: 1 }}>
                        hola
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Categories