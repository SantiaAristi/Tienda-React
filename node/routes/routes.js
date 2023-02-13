import express from 'express'; // Importamos express
import { bookProduct, getAllProducts, updateProduct, resetStock, resetProduct, payProducts } from '../controllers/ProductController.js'; // Importamos las funciones creadas para el manejo de productos 
import { getAllUsers, createUser, updateUser } from '../controllers/UserController.js'; // Importamos las funciones creadas para el manejo de los usuarios

const router = express.Router()

// Se indican las rutas de cada petición HTTP.
router.get('/', getAllProducts);
router.post('/change', updateProduct);
router.post('/changeUser', updateUser);
router.get('/login', getAllUsers);
router.post('/login', createUser);
router.get('/book/:id', bookProduct);
router.get('/resetStock', resetStock);
router.get('/resetProduct/:id', resetProduct);
router.post('/pay', payProducts);

export default router;