import { CardElement, useElements} from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import '../stylesheets/ShowHeader.css';

const PayModal = (prop) => { // Es el form que vamos a enviar a stripe

    const stripe = useStripe(); // Nos devuelve la conexión a stripe
    const elements = useElements(); // Accede a los elementos de stripe
    const URL = 'http://localhost:8000/pay/'; // Ruta a la que se realizará la petición
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitamos que la página se refrezque
        const {error, paymentMethod} = await stripe.createPaymentMethod({ // Creamos un método de pago

            type: 'card', // El tipo de pago que se está registrando
            card: elements.getElement(CardElement) // Obtenemos lo que se encuentre tipeado dentro del elemento

        });

        setLoading(true);

        if (!error){
            const { id } = paymentMethod; // id de la compra

            try {
                await axios.post( // Utilizamos el método post de axios
                    URL, // Ruta a la que se realizará la petición
                    {
                        id, // Cuerpo que se envía el id de la compra generado por stripe
                        amount: prop.amount // Se envía el monto a pagar
                    }
                );

                prop.clearCart();

                alert('Pago realizado exitosamente.');
                elements.getElement(CardElement).clear(); // Limpiamos el input

            } catch (error) {
                alert('Ha ocurrido un error en el pago.')
                console.log(error);
            }
        }
        setLoading(false);
    }

    return(
        <form onSubmit={handleSubmit} > {/* Se añade el atributo onSubmit para identificar el evento */}
            <CardElement /> {/* Este es el input con todas las validaciones que nos proporciona stripe */}
            <button className="pay-products">
                {loading ? "Loading..." : "Realizar pago"}
            </button>     
        </form>
    )
};

export default PayModal;
