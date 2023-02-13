import db from '../database/db.js';

import { DataTypes } from 'sequelize';

// Se define un modelo para los usuarios, el cual contiene los campos y el respectivo valor de cada campo en la base de datos.
const UserModel = db.define('users', {
    user_name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    tel: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    id: { type: DataTypes.INTEGER, primaryKey: true }
})

export default UserModel; // Se exporta el modelo de los usuarios