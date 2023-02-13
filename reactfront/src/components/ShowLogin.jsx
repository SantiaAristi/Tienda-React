import React from "react";
import axios from "axios"; // Se importa la biblioteca de cliente HTTP axios, la cual permite realizar solicitudes a un endpoint determinado.
import { useState, useEffect, useContext } from "react"; // Se importan el hook de efecto, permite realizar efectos secundarios en componentes funcionales y el hook de variables de estado.
import { useNavigate } from "react-router-dom"; // Se importa el hook para navegar directamente entre rutas.
import { StoreContext } from "../context/store-context";
import '../stylesheets/ShowLogin.css';

const URI = 'http://localhost:8000/login/'; // Ruta (endpoint) a la cual se van a realizar las solicitudes.

const CompShowLogin = () => { // Se define el componente.

    const context = useContext(StoreContext);
 
    const navigate = useNavigate(); // Definición de hook navigate.

    const [users, setUsers] = useState([]); //Se definen las variables de estado User.
    const [nameIn, setNameIn] = useState(''); 
    const [passwordIn, setPasswordIn] = useState('');

    useEffect( () => { // Se utiliza el hook de efecto.
        getUsers() // Se realiza el efecto secundario después de cada renderizado.
    }, [])

    const getUsers = async () => { // Función que envía petición HTTP y guarda los datos recibidos.
        const res = await axios.get(URI); // Envía una petición GET a la URI y almacena los datos recibidos.
        setUsers(res.data); // Actualiza la variable, con el response de la petición HTTP.
    };

    const navigateRegister = () => {
        navigate('/register') // Se define la función que redirecciona a la ruta de register.
    };

    var count = 0;
    
    const onVerifyUser = async (e) => {  //Función para verificar si una persona ya se encuentra registrada.
        e.preventDefault();

        users.forEach(user => {
            if ((user.user_name === nameIn.trimEnd()) && (user.password === passwordIn)) {
                count = 1;
                if (user.id === 1) {
                    context.setUser(user);
                    context.setLogged(true);
                    navigate('/admin'); // Redirecciona al usuario a la ruta donde se renderizan los productos.
                } else {
                    context.setUser(user);
                    context.setLogged(true);
                    navigate('/'); // Redirecciona al usuario a la ruta donde se renderizan los productos.
                }
            }
        })

        if (count === 0){
            setPasswordIn(''); // Se actualiza la variable de estado.
            alert('El usuario ingresado o la contraseña son incorrectos. Intente de nuevo.'); // Despliega una ventana emergente de alerta, indicando al usuario que el usuario o la contraseña ingresada no son correctos.
        }
    };

    return ( // Estructura HTML del componente.
        <div className="container-login">
            <div className="container-logo-login">
                <img className="logo-login" alt='Imagen Logo' src={require("../images/logo.webp")} />
            </div>

            <form onSubmit={onVerifyUser} method="post">
                <div className="titulo-login">
                    <h1>Login</h1>
                </div>
                <div className="container-input">
                    <div className="user">
                        <input value={nameIn} className="input-login" type="text" placeholder="Ingrese su usuario..." onChange={ (e) => setNameIn(e.target.value) } required />
                    </div>
                    
                    <div className="password">
                        <input value={passwordIn} className="input-login" type="password" placeholder="Ingrese su contraseña..." onChange={ (e) => setPasswordIn(e.target.value) } required />
                    </div>
                </div>

                <div className="container-submit">
                    <input type="submit" className="btn-submit" value="Entrar" />
                </div>
                <div className="register-link">
                    <span className="register" onClick={navigateRegister}>Crear una cuenta</span>
                </div>
            </form>
        </div>
    )
}

export default CompShowLogin; // Se exporta el componente