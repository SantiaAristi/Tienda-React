import axios from 'axios';
import { useState, useContext } from 'react';
import { StoreContext } from "../context/store-context";
import { useNavigate } from "react-router-dom"
import '../stylesheets/Admin.css';

const URI = 'http://localhost:8000/change/';
const URL = 'http://localhost:8000/changeUser/';

const Admin = () => {

    const navigate = useNavigate();

    const context = useContext(StoreContext);

    const[nameIn,setNameIn] = useState('');
    const[passwordIn,setPasswordIn] = useState('');
    const[telIn,setTelIn] = useState('');
    const[emailIn,setEmailIn] = useState('');

    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [stockProduct, setStockProduct] = useState('');
    const [minProduct, setMinProduct] = useState('');
    const [maxProduct, setMaxProduct] = useState('');
    const [desProduct, setDesProduct] = useState('');
    
    const changeProducts = async (product) => {
        const body = {
            id : product.id,
            nameProduct : nameProduct === "" ? product.nameProduct : nameProduct,
            price : priceProduct === "" ? product.price : priceProduct,
            stock : stockProduct === "" ? product.stock : stockProduct,
            stockMin : minProduct === "" ? product.stockMin : minProduct,
            stockMax : maxProduct === "" ? product.stockMax : maxProduct,
            description : desProduct === "" ? product.description : desProduct
        }
        await axios.post(URI, body);
        alert('Registro actualizado exitosamente.');
        window.location.reload();
    };

    const changeUser = async (user) => {
        console.log(user);
        const bodyUser = 
        {
            id : user.id,
            user_name : nameIn === "" ? user.user_name : nameIn,
            password : passwordIn === "" ? user.password : passwordIn,
            tel : telIn === "" ? user.tel : telIn,
            email : emailIn === "" ? user.password : emailIn
        }
        await axios.post(URL, bodyUser); 
        alert('Registro actualizado exitosamente.');
        window.location.reload();
    }

    const SesionOut = () => {
        alert('Sesión cerrada.');
		context.setUser('');
        context.setLogged(false);
        navigate('/');
	}

    const user = context.user;

    return( // Estructura HTML del componente.
            <div className='admin-menu' >
                <div className='title-admin'>
                    <h2>Datos del admin</h2>
                </div>
                

                <div className='container-admin'>
                    <input type="text" className='input-admin' placeholder='Nuevo nombre...' onChange={(e) => setNameIn(e.target.value)} />
                    <input type="text" className='input-admin' placeholder='Nueva Contraseña...' onChange={(e) => setPasswordIn(e.target.value)} />
                    <input type="text" className='input-admin' placeholder='Nuevo teléfono...' onChange={(e) => setTelIn(e.target.value)} />
                    <input type="text" className='input-admin' placeholder='Nuevo email...' onChange={ (e) => setEmailIn(e.target.value)} />
                    <span className="material-symbols-outlined" onClick={() =>{changeUser (user)}}>history_edu</span>
                    <span className="material-symbols-outlined" title="Cerrar sesion" onClick={SesionOut}>door_open</span>
                </div>
                
                <div className='title-products-admin'>
                    <h1>Productos</h1>
                </div>
                
                <div className='nota'>
                    <h3>Nota: cada producto debe ser actualizado de uno en uno dando click al boton de guardar.</h3>
                </div>
                
                <div className='container-titles'>
                    <h2>Producto</h2>
                    <h2>Precio</h2>
                    <h2>S. mínimo</h2>
                    <h2>Stock</h2>
                    <h2>S. máximo</h2>
                    <h2>Descripción</h2>
                </div>
            {
            context.products.map(product =>( // La funcion map lo que hace es recorrer a products como un arreglo y por cada posicion se realiza 
                                        //un bloque de codigo html con los datos del producto en la posicion que se encuentre map
                <div className='container-product-admin' key={product.id}>
                    <input type="text" className='product-admin' placeholder={ product.nameProduct } onChange={ (e) => setNameProduct(e.target.value)} />
                    <input type="text"  className='product-admin'placeholder={ product.price } onChange={ (e) => setPriceProduct(e.target.value)} />
                    <input type="number" className='product-admin'placeholder={ product.stockMin } onChange={ (e) => setMinProduct(e.target.value)} />
                    <input type="number" className='product-admin'placeholder={ product.stock } onChange={ (e) => setStockProduct(e.target.value)} />
                    <input type="number" className='product-admin'placeholder={ product.stockMax } onChange={ (e) => setMaxProduct(e.target.value)} />
                    <input type="text" className='description-admin' placeholder={ product.description } onChange={ (e) => setDesProduct(e.target.value)} title={product.description} />
                    <span className="material-symbols-outlined save" onClick={() =>{changeProducts(product)}}>history_edu</span>
                </div> ))
                } 
                <div className='footer-admin'>
                    <h1>OnlineShop</h1>
                </div>
        </div> 
    )
};

export default Admin;