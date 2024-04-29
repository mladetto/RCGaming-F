import { useContext } from "react"
import { CartContext } from "../Context/CardContext"
import { Link } from "react-router-dom"
import { Button, Container } from "react-bootstrap"
import { jwtDecode } from "jwt-decode"
import UserContext from "../Context/UserContext"
import axios from "axios"
import Swal from 'sweetalert2';


const Cart = () => {

    const { cart, clearCart, totalQuantity, total } = useContext(CartContext)
    const { currentUser } = useContext(UserContext);

    const decodedToken = jwtDecode(currentUser.token);
    const userId = decodedToken._id;

    const API = import.meta.env.VITE_API;



    if (totalQuantity() === 0) {
        return (
            <Container className="text-center py-5">
                <h1 className="title py-2">No hay items en el carrito</h1>
                <h5>Volver para seleccionar productos</h5>
                <Link className="btn btn-count my-5 fs-5" variant="purple" to='/'>Productos</Link>
            </Container>
        )
    }

    const orderData = {
        items: cart.map(item => ({id: item._id, name: item.name, price: item.price, quantity: item.quantity })),
        totalPrice: total()
    };

    const createOrder = async () => {
        try {
            const response = await axios.post(`${API}/order/orderCreate`, { user_id: userId, ...orderData });
            if (response.status === 201) {
                clearCart();
                Swal.fire({
                    title: 'Orden creada',
                    text: 'La orden fue creada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                alert(`Error al crear la orden: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            alert('Ocurrió un error al crear la orden');
        }
    }

    console.log("cart->>", cart);
    return (
        <Container className="py-5">
            <h2 className="title">Carrito</h2>
            <hr />
            {cart.map((elem, index) => <div key={index} className="container d-flex justify-content-center">
                <div className="d-flex border mb-4 w-50 p-2 shadow">
                    <img src={elem.imageUrl} alt="" width={120} />
                    <div className="px-3">
                        <p><strong>Nombre: </strong>{elem.name}</p>
                        <p><strong>Precio: </strong>${elem.price}</p>
                        <p><strong>Cantidad: </strong>{elem.quantity}</p>
                    </div>
                </div>
            </div>)}
            <div className="text-center">
                <h4>Total: ${total()}</h4>
                <div className="w-50 mx-auto d-flex justify-content-around mt-4">
                    <Button onClick={() => clearCart()}className='btn-count fs-5' variant="purple">Limpiar Carrito</Button>
                    <Button onClick={() => createOrder()} className='btn-count btn-checkout fs-5' variant="purple">Finalizar Compra</Button>
                </div>
            </div>
        </Container>
    )
}

export default Cart