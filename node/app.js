import express from 'express'; // Importamos express
import cors from 'cors'; // Importamos cors, nos ayuda a comunicar el back-end con el front-end
import db from './database/db.js'; // Se importa la conexion con la base de datos

import productRoutes from './routes/routes.js'; // Importamos las rutas del servidor
import ProductModel from './models/ProductModel.js'; // Importamos el modelo del producto con sus atributos
 
const app = express(); // Se guarda en una constante las funciones de express

app.use(cors()); // Es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador
app.use(express.json()); // Middleware analiza las solicitudes JSON entrantes y coloca los datos analizados en req.body. 
app.use('/', productRoutes); // Se establece la ruta raiz


const products = await ProductModel.findAll({  // Metodo para leer la tabla de la base de datos con los atributos requeridos
    attributes: ['id', 'nameProduct', 'stock', 'stockMin']
});

const productsStockDefault = products.map( (product) =>  product.stock ); // Crea un arreglo fijo con el stock de la base de datos

let productsStock = products.map( (product) => product.stock ); // Crea un arreglo dinámico con el stock de la base de datos

// products.forEach(product => { // El método forEach() ejecuta la función indicada una vez por cada elemento del array products.
//     productMinStock[product.dataValues.id] = { stockMin: product.dataValues.stockMin, nameProduct: product.dataValues.nameProduct }
// });
// // Se guarda el stock minimo y el nombre de cada producto en el array, su posicion en el array depende del id del producto


export { productsStock, productsStockDefault, products }; // Se exportan los arrays que contienen el stock y el stock minimo de cada producto respectivamente

// La declaración try...catch señala un bloque de instrucciones a intentar (try), y especifica una respuesta si se produce una excepción (catch).
try {
    await db.authenticate() // Permite autenticarnos en la base de datos desde el shell.
    console.log('Conexion exitosa a la DB');
} catch (error) {
    console.log(`El error de conexion es: ${error}`); // Nos ayuda a identificar el error
}

app.listen(8000, () => { // Se utiliza para vincular y escuchar las conexiones en el host y el puerto especificados
    console.log('Server UP runing in http://localhost:8000/');
})