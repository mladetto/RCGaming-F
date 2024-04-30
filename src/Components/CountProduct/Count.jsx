import { useState } from "react";
import Button from 'react-bootstrap/Button';
import './Count.css';

const Count = ({stock, initial, onAdd}) =>{
    
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if(quantity < stock){
            setQuantity(quantity+1)
        }
    }

    const decrement = () =>{
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }

    return(
        <div className="container , container-count">
            <div className="container-controler">
                <Button className="btn-count" variant="purple" onClick={decrement}>-</Button>
                <h4 className="Number">{quantity}</h4>
                <Button className="btn-count" variant="purple" onClick={increment}>+</Button>
            </div>
            <div>
                <Button className="btn-add" variant="purple" onClick={()=> onAdd(quantity)} disabled={!stock}>
                    Agregar al carrito
                </Button>
            </div>
        </div>
    )
}

export default Count;