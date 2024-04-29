import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


const Order = () => {
    const [order, setOrder] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getOrder();
    }, []);

    async function getOrder() {
        try {
            const resp = await axios.get(`${API}/order`);
            setOrder(resp.data);
        } catch (error) {
            throw new Error("Error al obtener todas las ordenes" + error.message);
        }
    }

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    }

    return (
        <>
            <Container className="py-5">
                <h1 className="title">Ordenes</h1>
                <hr />
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>nombre</th>
                                <th>email</th>
                                <th>total</th>
                                <th>fecha</th>
                                <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((elem, index) => (
                                <tr key={index}>
                                    <td>{elem.user_id.name}</td>
                                    <td>{elem.user_id.email}</td>
                                    <td>${elem.totalPrice}</td>
                                    <td>{elem.date}</td>
                                    <td>
                                        <Button className="btn btn-count" variant="purple" onClick={() => handleShowModal(elem)}>Ver</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la orden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <p><strong>Cliente: </strong>{selectedOrder.user_id.name}</p>
                            <p><strong>Correo: </strong>{selectedOrder.user_id.email}</p>
                            <p><strong>Total: </strong>${selectedOrder.totalPrice}</p>
                            <p><strong>Fecha: </strong>{selectedOrder.date}</p>
                            <h5><strong>Elementos:</strong></h5>
                            <ul>
                                {selectedOrder.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - Cantidad: {item.quantity} - Precio: ${item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>

    )
}

export default Order;