import React, { useState, useContext } from "react"; // Se importa el hook de variables de estado. 
import { useNavigate } from "react-router-dom"; // Se importa el hook para navegar directamente entre rutas.
import { StoreContext } from "../context/store-context"; // Se importa el contexto para poder acceder a variables globales
import axios from "axios"; // Importamos axios para realizar peticiones al servidor
import '../stylesheets/ShowHeader.css'; // Importamos la hoja de estilo correspondiente a este componente
import { Elements } from "@stripe/react-stripe-js"; // Los elementos hijos del componente Elements tendrán conexión con stripe
import { loadStripe } from "@stripe/stripe-js"; // Se llama a la funcion loadStripe para cargar la conexion hacia la plataforma de stripe
import PayModal from "./Pay";
import emailjs from '@emailjs/browser';
  
const stripePromise = loadStripe('pk_test_51MXWf0DVLK60hYbtBTdtiniclGjVJtqBNRQPuIHXzAaZMT7iMIKBK36nOE6bB0ZsGdyMhbC2geGMNkv5dANAYjAx00zj2gBK0u'); // Clave publica que nos brinda stripe
// Nos conectamos a stripe

const CompShowHeader = () => {

  const context = useContext(StoreContext);

  const [activeCart, setActiveCart] = useState(false); // Declaramos variables de estado para saber si el menu del carrito se encuentra desplegado o no
  const [activeUser, setActiveUser] = useState(false); // Declaramos variables de estado para saber si el menu del usuario se encuentra desplegado o no

  const URI = 'http://localhost:8000/book/'; // Declaramos las rutas a las cuales se van a solicitar las peticiones
  const URL = 'http://localhost:8000/resetStock/';
  const resetProduct = 'http://localhost:8000/resetProduct/';

  const navigate = useNavigate();

  const onDeleteProduct = (product) => { // Funcion utilizada para eliminar productos del carrito
    axios.get((resetProduct + product.id))
    .then(({ data }) => {
      console.log(data)
      if ( data === 'resetProduct') {

        const results = context.allProductsCart.filter(
          item => item.id !== product.id
          );

          context.setTotal(context.total - product.price * product.quantity);
          context.setCount(context.count - product.quantity);
          context.products.forEach( item => { 
            if (item.id === product.id) {
            item.quantity = 2;
            } 
          });
          context.setAllProductsCart(results); 

      }
    })
  };

  const onClearCart = () => { // Función para vaciar el carrito, inicializando los respectivos contextos en 0.
    axios.get(URL)
    .then(({ data }) => {
      console.log(data)
      if ( data === 'Empty'){
        context.products.forEach( item => item.quantity = 2 ); // Se inicializa en 2 para activar nuevamente el boton de añadir al carrito
        context.setAllProductsCart([]);
        context.setTotal(0);
        context.setCount(0);
      }
    });
  };

  const onPayProducts = () => {
    context.allProductsCart.forEach( item => {
      context.products.forEach(product => {
        if (product.id === item.id){
          product.stock = product.stock - item.quantity;
          item.stock = item.stock - item.quantity;
        }
      }) 
    });

    console.log(context.allProductsCart);
    
    context.allProductsCart.forEach((product) => {
      if (product.stock <= product.stockMin) {
          emailjs.send("service_t4hwnag", "template_ig4uz7y", {
              product_id: product.id,
              product_name: product.nameProduct
          }, 'Y9W6qKac3kgn7wBtk');
      }
    });

    context.products.forEach( item => item.quantity = 2 ); // Se inicializa en 2 para activar nuevamente el boton de añadir al carrito
    context.setAllProductsCart([]);
    context.setTotal(0);
    context.setCount(0);
  }


  const moreQuantity = (product) => { // Funcion utilizada para aumentar la cantidad de productos al carrito
    axios.get(URI + product.id + '?p=book')
      .then(({ data }) => {
        console.log(data);
        if(data === 'Booked'){
          const products = context.allProductsCart.map(cartItem => cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
            );

            context.setTotal(context.total + product.price);
            context.setCount(context.count + 1);
            return context.setAllProductsCart([...products]);

        } else if (data === 'Stockout') {
          alert('No se pueden llevar más unidades del producto.');
        }
      })

      .catch(error => {
        console.log(error.message);
      }) 
  };

  const lessQuantity = (product) => { // Funcion utilizada para disminuir la cantidad de los productos en el carrito
    if (product.quantity > 1) {
      axios.get(URI + product.id + '?p=unbook')
      .then(({ data }) => {
        console.log(data)
        if(data === 'Unbooked'){
          const products = context.allProductsCart.map(item => item.id === product.id 
            ? { ...item, quantity: item.quantity - 1 }
            : item
            );
            context.setTotal(context.total - product.price);
            context.setCount(context.count - 1);
            return context.setAllProductsCart([...products]);
        } 
      })
      .catch(error => {
        console.log(error.message);
      }) 
  }
  };

  const navigateLogin = () => { // Función para redireccionar a la ruta del login e informar al contexto que ya no se encuentra ningún usuario logueado.
    navigate('/login')
  };
  
  const navigateCloseSesion = () => { // Función para redireccionar a la ruta del login e informar al contexto que ya no se encuentra ningún usuario logueado.
    if (activeCart){
      setActiveCart(!activeCart);
    }
    
    setActiveUser(!activeUser);
    context.setLogged(false);
    context.setAllProductsCart([]);
    context.setTotal(0);
    context.setCount(0);
  };

  return (
    <div className="container-header">
      <div className="container-logo">
        <img className="logo" alt='Imagen Logo' src={require("../images/logo.webp")}/>
      </div>
      <div className="container-title">
        <h1>OnlineShop</h1>
      </div> 

      <div className="container-header-right">
        
        <div className='container-user'>
          <span onClick={context.logged ? () => setActiveUser(!activeUser) : navigateLogin} className="material-symbols-outlined">person</span>
          {/* Condicional ternario para redireccionar al ususario al login */}
          <div className={`container-menu-user ${activeUser ? '' : 'hidden-user'}`}>
            {/* Condicional ternario para desplegar el menu de usuario */}
            <div className="user-logged">
              <p>¡Hola, {context.user.user_name}!</p>
              {/* Se solicita el nombre del usuario loggeado guardado en una variable del contexto */}
            </div>

            <div className="sign-off">
              <p onClick={navigateCloseSesion}>Cerrar sesión</p>
              {/* Se hace un llamado a la funcion de cerrar la sesion del usuario loggeado */}
            </div>
          </div>

        </div>

        <div className="container-cart">
          <span onClick={context.logged 
            ? () => setActiveCart(!activeCart)
            :navigateLogin} className="material-symbols-outlined">shopping_cart</span>
            {/* Condicional ternario para redireccionar al ususario al login en caso de no estar loggeado */}
          <p className="counter">{context.count}</p>


          <div className={`container-menu-cart ${activeCart ? '' : 'hidden-cart'}`}>
            {
              context.allProductsCart.length ? (
                <>
                  <div className="container-products-row">
                  {context.allProductsCart.map(product => (
                      <div className="row-product" key={ product.id }>
                        <div className="quantity">

                          <span onClick={() => moreQuantity(product)} className="material-symbols-outlined arrow">expand_less</span>

                          <p>{ product.quantity }</p>
                          <span onClick={() => lessQuantity(product)} className="material-symbols-outlined arrow">expand_more</span>
                        </div>
                        <p className="name-product">{ product.nameProduct }</p>
                        <p>${ product.price }</p>
                        <span onClick={() => onDeleteProduct(product)} className="material-symbols-outlined cruz-icon">close</span>
                      </div>
                  ))}
                  </div>

                  <div className="container-total">
                    <p><strong>Total: ${ context.total }</strong></p>
                  </div>
                  <button onClick={() => onClearCart()} className="clear-cart">
                    Vaciar Carrito
                  </button>

                  <div className="pay-btn">
                    <Elements stripe={stripePromise}> {/*Establece la conexion con stripe mediante el stripePromise*/}
                      <PayModal amount={context.total} clearCart={onPayProducts}/> 
                    </Elements>
                  </div>
                </>
              ) : (
                <div className="cart-empty">
                  <p>El carrito está vacío</p>
                </div>
              )
            }
          </div>

        </div>
      </div>

    </div>
  )
};


export default CompShowHeader; // Se exporta el componente