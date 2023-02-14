const jwt = require("jsonwebtoken")
const Usuario = require("../models/Usuario")

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("Token: "+token)
        const decoded = jwt.verify(token, 'nuevousuario')
        
        const usuario = await Usuario.findOne({_id:decoded._id, "tokens.token":token})
        console.log(usuario)
        if (!usuario) {
            throw new Error()
        }

        req.token = token
        req.usuario = usuario

        next()
    } catch(e){
        console.log(e)
        res.status(401).send({error:"Introduce los datos correctamente"})
    }

}

module.exports = auth