import { Sequelize } from "sequelize";

// Se realiza la conexión con la base de datos con Sequelize (ORM, Object-Relational mapping)

const db = new Sequelize('database_app', 'root', 'root', { // Ingresamos el nombre de la base de datos, su usuario y contraseña
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export default db; // Se exporta la conexion con la base de datos