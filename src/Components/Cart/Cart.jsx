import { useContext } from "react"
import { CartContext } from "../Context/CardContext"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { jwtDecode } from "jwt-decode"
import UserContext from "../Context/UserContext"
import axios from "axios"


const Cart = () => {

    const { cart, clearCart, totalQuantity, total } = useContext(CartContext)
    const { currentUser } = useContext(UserContext);

    const decodedToken = jwtDecode(currentUser.token);
    const userId = decodedToken._id;

    const API = import.meta.env.VITE_API;



    if (totalQuantity() === 0) {
        return (
            <div>
                <h1>No hay items en el carrito</h1>
                <h5>Volver para seleccionar productos</h5>
                <Link to='/'>Productos</Link>
            </div>
        )
    }

    const orderData = {
        items: cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
        totalPrice: total()
    };

    const createOrder = async () => {
        try {
            const response = await axios.post(`${API}/order/orderCreate`, { user_id: userId, ...orderData });
            if (response.status === 201) {
                clearCart();
                alert('Orden creada exitosamente');
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
        <div>
            {cart.map((elem, index) => <div key={index} className="container">
                <div className="d-flex border mb-2">
                    <img src={elem.imageUrl} alt="" width={120} />
                    <div>
                        <p>Nombre: {elem.name}</p>
                        <p>Precio: {elem.price}</p>
                        <p>Cantidad: {elem.quantity}</p>
                    </div>
                </div>
            </div>)}
            <div className="text-center">
                <h4>Total: ${total()}</h4>
                <div>
                    <Button onClick={() => clearCart()}>Limpiar Carrito</Button>
                    <Button onClick={() => createOrder()} class='btn btn-secondary btn-checkout'>Finalizar Compra</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart