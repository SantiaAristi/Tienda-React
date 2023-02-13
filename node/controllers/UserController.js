import UserModel from "../models/UserModel.js";

// Función asincrónica que mediante el método findAll solicita los valores especificados en UserModel y los retorna en formato JSON.
// En caso de generarse un error en el transcurso del método se arroja el mensaje de dicho error
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// Función asincrónica que mediante el método create, crea un registro en la base de datos de acuerdo con el modelo especificado en UserModel con los valores enviados desde el body, posteriormente envía un JSON con el mensaje de confirmación.
// En caso de generarse un error en el transcurso del método se arroja el mensaje de dicho error.
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body)    
        res.json({
            "message": "¡Registro creado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateUser = async (req, res) => {
    console.log(req.body);
    try {
        await UserModel.update(
            {
                user_name: req.body.user_name,
                password: req.body.password,
                tel: req.body.tel,
                email: req.body.email,
            },
            {
                where: { id: req.body.id }
            }
        )
        res.json({
            "message": "¡Cambio efectuado correctamente"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}