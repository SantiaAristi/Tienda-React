import React, { useContext } from 'react';  // Se importan el hook de efecto, permite realizar efectos secundarios en componentes funcionales y el hook de variable de estado.
import '../stylesheets/ShowProducts.css';
import { StoreContext } from "../context/store-context";
import axios from 'axios';

const CompShowProducts = () => {
  const context = useContext(StoreContext);

  const URI = 'http://localhost:8000/book/';

  const onAddProduct = (product) => {
    if (product.quantity === 2){
      if (product.stock > 0) {
        axios.get(URI + product.id + '?p=book')
        .then(({ data }) => {
          if(data === 'Booked') {
            product.quantity = 1;
            context.setTotal(context.total + product.price);
            context.setCount(context.count + 1);
            context.setAllProductsCart([...context.allProductsCart, product]);
          } else if (data === 'Stockout') {
            alert('No se pueden llevar más unidades del producto.');
          }
        })

        .catch(error => {
          console.log(error.message);
        }) 
      }
    }
  };


  return ( // Estructura HTML del componente.
       context.products.map ( product => (
        <div className='item' key={ product.id }>
          <div className='container-img'>
            <ul>
              <li><img src={product.image1} alt={product.nameProduct} /></li>
              <li><img src={product.image2} alt={product.nameProduct} /></li>
              <li><img src={product.image3} alt={product.nameProduct} /></li>
            </ul>
          </div>

          <div className='text-container'>
            <div className='price'><p>${ product.price }</p></div>
            <hr className='line-card' />
            <div className='description'>{ product.description }</div>
          </div>
          <button onClick={() => onAddProduct(product)} className='btn' variant="primary">Añadir al carrito</button>
        </div>
      )) 
  );
}

export default CompShowProducts; // Se exporta el componente    