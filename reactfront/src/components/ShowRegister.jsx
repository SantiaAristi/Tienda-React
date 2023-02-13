import React from "react";
import axios from "axios"; // Se importa la biblioteca de cliente HTTP axios, la cual permite realizar solicitudes a un endpoint determinado.
import { useState, useEffect, useContext } from "react"; // Se importan el hook de efecto, permite realizar efectos secundarios en componentes funcionales y el hook de variables de estado.
import { useNavigate } from "react-router-dom"; // Se importa el hook para navegar directamente entre rutas.
import { StoreContext } from "../context/store-context";
import '../stylesheets/ShowRegister.css';

const URI = 'http://localhost:8000/login/'; // Ruta (endpoint) a la cual se van a realizar las solicitudes.

const CompShowRegister = () => { // Se define el componente

    const context = useContext(StoreContext);

    const navigate = useNavigate(); // Definición de hook navigate.
    const [users, setUsers] = useState([]); // Definición de variable de estado.
    const [nameIn, setNameIn] = useState(''); 
    const [passwordIn, setPasswordIn] = useState('');
    const [telIn, setTelIn] = useState('');
    const [emailIn, setEmailIn] = useState('');


    useEffect( () => { // Se utiliza el hook de efecto.
        getUsers() // Se realiza el efecto secundario después de cada renderizado.
    }, [])

const getUsers = async () => { // Función asincrónica que envía petición HTTP y guarda los datos recibidos.
        const res = await axios.get(URI); // Envía una petición GET a la URI y almacena los datos recibidos.
        setUsers(res.data); // Actualiza la variable, con el response de la petición HTTP.
    };

    const navigateLogin = () => { 
        navigate('/login') // Se define la función que redirecciona a la ruta de login.
    };

    const onRegisterUser = async (e) => {
        e.preventDefault(); // Evita que se realice la acción predeterminada del evento. 
        if(users.find(user => ((user.user_name === nameIn)))){
            setNameIn(''); // Se actualiza la variable de estado.
            setPasswordIn(''); // Se actualiza la variable de estado.
            alert('El nombre ingresado ya se encuentra en uso. Por favor digite otro nombre.'); // Despliega una ventana emergente de alerta, indicando al usuario que ya existe otro usuario con el nombre ingresado.
        } else {
            await axios.post(URI, {user_name: nameIn, password: passwordIn, tel: telIn, email: emailIn}); // Envia una petición POST a la URI indicada.
            context.setUser(nameIn);
            setNameIn(''); // Se actualiza la variable de estado.
            context.setLogged(true);
            navigate('/'); // Redirecciona al usuario a la ruta donde se renderizan los productos.
        }
    };

    return ( // Estructura HTML del componente.
        <div className="container-register">
            <div className="container-logo-register">
                <img className="logo-register" alt='Imagen Logo' src={require("../images/logo.webp")}/>
            </div>

            <form onSubmit={onRegisterUser} method="post">
                <div className="titulo-register">
                    <h1>Register</h1>
                </div>
                <div className="container-input">
                    <div className="user">
                        <input value={nameIn} className="input-register" type="text" placeholder="Nombre de ususario..." onChange={ (e) => setNameIn(e.target.value) } required />
                    </div>
                    
                    <div className="password">
                        <input value={passwordIn} className="input-register" type="password" placeholder="Contraseña..." onChange={ (e) => setPasswordIn(e.target.value) } required />
                    </div>

                    <div className="tel">
                        <input value={telIn} className="input-register" type="text" placeholder="Teléfono..." onChange={ (e) => setTelIn(e.target.value) } required />
                    </div>

                    <div className="email">
                        <input value={emailIn} className="input-register" type="text" placeholder="Email..." onChange={ (e) => setEmailIn(e.target.value) } required />
                    </div>
                </div>

                <div className="container-submit">
                    <input type="submit" className="btn-submit" value="Crear" />
                </div> 
                <div className="login-link">
                 <span className="login" onClick={navigateLogin}>Ingresar</span>
                </div>
            </form>

        </div>
    )
}

export default CompShowRegister; // Se exporta el componente