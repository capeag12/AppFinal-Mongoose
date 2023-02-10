const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isemail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const esquemaUsuario = new mongoose.Schema({
    nombre:{
        type:String, 
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("El correo es invalido")
            }
        }
    },
    passwd:{
        type:String,
        required:true,
        validate(value){
            if (value.toLowerCase().includes('passwd') || value.toLowerCase().includes('1234')) {
                throw new Error("Formato invalido")
            } 
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    

})

esquemaUsuario.methods.toJSON = function(){
    const user = this
    const objUsuario = user.toObject()

    delete objUsuario.passwd
    
    return objUsuario
}

esquemaUsuario.methods.generarTokenAuth= async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"nuevoUsuario")

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

esquemaUsuario.static.findByCredenciales = async function(email, passwd){
    const usuario = await Usuario.findOne({email})

    if (!user) {
        throw new Error("No existe el email")
    }

    const encontrado = await bcrypt.compare(passwd,usuario.passwd)
    
    if (!encontrado) {
        throw new Error("No se puede logear")
    }

    return usuario

}

esquemaUsuario.pre("save", async function(next){
    const usuario = this
    usuario.passwd = await bcrypt.hash(usuario.passwd,8)
    next()

})

const Usuario = mongoose.model('Usuario',esquemaUsuario)

module.exports = Usuario