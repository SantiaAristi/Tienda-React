import db from '../database/db.js'; // Importamos la conexion con la base de datos

import { DataTypes } from 'sequelize'; // Para acceder a los tipos de datos de la base de datos


// Se define un modelo para los usuarios, el cual contiene los campos y el respectivo valor de cada campo en la base de datos.
const ProductModel = db.define('productos', { // Se define el modelo de la tabla de productos con sus respectivos campos
    quantity: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    stockMin: { type: DataTypes.INTEGER },
    stockMax: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.INTEGER },
    nameProduct: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    image1: { type: DataTypes.TEXT },
    image2: { type: DataTypes.TEXT },
    image3: { type: DataTypes.TEXT }
});

export default ProductModel; // Se exporta el modelo de los productos