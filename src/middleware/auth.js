const jwt = require("jsonwebtoken")
const Usuario = require("../models/Usuario")

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'nuevoUsuario')
        const usuario = await Usuario.findOne({_id:decoded._id, "tokens.token":token})

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.usuario = usuario

        next()
    } catch(e){
        res.status(401).send({error:"Introduce los datos correctamente"})
    }

}

module.exports = auth