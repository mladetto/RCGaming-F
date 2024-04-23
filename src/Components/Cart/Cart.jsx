import { useContext } from "react"
import { CartContext } from "../Context/CardContext"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const Cart = () => {

    const { cart, clearCart, totalQuantity, total } = useContext(CartContext)

    if (totalQuantity() === 0) {
        return (
            <div>
                <h1>No hay items en el carrito</h1>
                <h5>Volver para seleccionar productos</h5>
                <Link to='/'>Productos</Link>
            </div>
        )
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
                    <Link to='/' class='btn btn-secondary btn-checkout'>Finalizar Compra</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart