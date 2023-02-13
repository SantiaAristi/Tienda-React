import React, { createContext, useState, useEffect} from "react";
import axios from 'axios'; // Se importa la biblioteca de cliente HTTP axios, la cual permite realizar solicitudes a un endpoint determinado.
import { useLocalStorage } from "../localStorage";

export const StoreContext = createContext(null);

const URI = 'http://localhost:8000/'; // Ruta (endpoint) a la cual se van a realizar las solicitudes.

export const StoreContextProvider = (props) => {
  
    const getProducts = async () => { // Función que envía petición HTTP y almacena los datos recibidos.
        const res = await axios.get(URI); // Envía una petición GET a la URI y almacena los datos recibidos.
        setProducts(res.data); // Actualiza la variable, con el response de la petición HTTP.
    }; 

    useEffect( () => { // Se utiliza el hook de efecto.
        getProducts() // Se realiza el efecto secundario después de cada renderizado.
    }, []);


    const [products, setProducts] = useState([]);
    const [allProductsCart, setAllProductsCart] = useLocalStorage('allProductsCart', ([]));
    const [logged, setLogged] = useLocalStorage('logged', (false));
    const [total, setTotal] = useLocalStorage('total', (0));
    const [count, setCount] = useLocalStorage('count', (0));

    const [user, setUser] = useLocalStorage('user', ('')); 

    return (
        <StoreContext.Provider value={{ logged, setLogged, allProductsCart, setAllProductsCart, total, setTotal, count, setCount, user, setUser, products, setProducts }}>
            {props.children}
        </StoreContext.Provider>
    )

}