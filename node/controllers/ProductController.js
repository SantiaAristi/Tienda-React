import ProductModel from "../models/ProductModel.js"; // Importamos el modelo de los productos
import { productsStock, productsStockDefault, products } from "../app.js"; // Importamos el array que contiene el stock de los productos
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51MXWf0DVLK60hYbtb3SZTQMhQu43EzNKVYwPbz045ANWq8QVxMC5yPtvs37CaSrm2lcMGLdbnBNWnBg6avSOFP3E002jPlx3qh"); // Clave privada que nos brinda stripe


// Función asincrónica que mediante el método findAll solicita los valores especificados en ProductModel y los retorna en formato JSON, para posteriormente ser exportados.
// En caso de generarse un error en el transcurso del método se arroja el mensaje de dicho error.

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll()
        res.json(products)
    } catch (error) {
        res.json( {message: error.message} )
    }
};

// Función asincrónica que mediante el método update solicita los valores especificados en ProductModel y los retorna en formato JSON, para posteriormente ser exportados.
// En caso de generarse un error en el transcurso del método se arroja el mensaje de dicho error.
export const updateProduct = async (req, res) => {
    console.log(req.body);
    try {
        await ProductModel.update( // Update actualiza varias instancias que coincidan con las opciones where.
            {
                nameProduct: req.body.nameProduct,
                price: req.body.price,
                stockMin: req.body.stockMin,
                stock: req.body.stock,
                stockMax: req.body.stockMax,
                description: req.body.description
            },
            {
                where: { id: req.body.id }
            }
        )
        res.json({  // Envia mensaje de confirmacion de la actualizacion realizada  
            "message": "¡Cambio efectuado correctamente"
        })
    } catch (error) { // Envia mensaje de error
        res.json({ message: error.message });
    }
};

export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.p === 'unbook') {

            productsStock[(req.params.id)-1]++;
            return res.json('Unbooked');

        } else if (req.query.p === 'book') {

            if (productsStock[(req.params.id)-1] == 0) {
                return res.json('Stockout')
            } else {

                productsStock[(req.params.id)-1]--;
                return res.json('Booked');
                
            }
        }

        res.status(400).json('Bad request');
    } catch (error) {
        res.json({message: error.message});
    }
};

export const resetProduct = async (req, res) => {
    try {
        productsStock[(req.params.id)-1] = productsStockDefault[(req.params.id)-1];
        console.log(productsStock);
        return res.json('resetProduct')
    } catch (error) { 
        res.json({ message: error.message });
    }
};

export const resetStock = async (req, res) => {
    try {
        for (let i = 0; i < productsStock.length; i++) {
            productsStock[i] = productsStockDefault[i];
        }
        console.log(productsStock);
        return res.json('Empty');
    } catch (error) {
        res.json({message: error.message});
    }
};

export const payProducts = async (req,res) => {
    try {
        let { id, amount } = req.body; // Obtenemos el id y el monto que fueron enviados

        for (let i = 0; i < productsStock.length; i++) {
            await ProductModel.update( // Update actualiza varias instancias que coincidan con las opciones where.
                {
                    stock: productsStock[i],
                },
                {
                    where: { id: (i+1) }
                }
            )
        };

        await stripe.paymentIntents.create({ // Creamos el pago
            amount: amount * 10, // Monto a cobrar
            currency: 'cop', // Moneda que será recibida
            payment_method: id, // id del pago
            confirm: true // Registra el pago y lo confirma

        });

        res.send({ message: 'Succesfull payment' }) // Mensaje de confirmación del pago

    } catch (error) {
        console.log(error); // Imprime el error
        res.json({ message: error.message }); // Mensaje que indica el porque fue rechazado el pago
    }
};
 