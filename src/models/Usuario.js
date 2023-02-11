const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isemail')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Juego = require('./Juego')

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

esquemaUsuario.virtual('juegos', {
    ref: 'Juego',
    localField: '_id',
    foreignField: 'seller'
})

esquemaUsuario.methods.toJSON = function(){
    const user = this
    const objUsuario = user.toObject()

    delete objUsuario.passwd
    delete objUsuario.tokens
    
    return objUsuario
}

esquemaUsuario.methods.generarTokenAuth= async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"nuevousuario")

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

esquemaUsuario.statics.findByCredenciales = async function(email,contraUsu){
    const usuario = await Usuario.findOne({email})

    if (!usuario) {
        throw new Error("No se encontró el usuario")
    }
    
    const iguales =await bcrypt.compare(contraUsu,usuario.passwd)
    console.log(iguales)
    if (!iguales) {
        throw new Error("Las contraseñas no coinciden")
    }
    else return usuario;

}

esquemaUsuario.pre("save", async function(next){
    const usuario = this

    if (usuario.isModified('passwd')) {
        usuario.passwd = await bcrypt.hash(usuario.passwd,8)
    }
    
    next()

})

esquemaUsuario.pre("remove", async function(next){
    const usuario = this
    await Juego.deleteMany({seller:usuario._id})
    next()

})

const Usuario = mongoose.model('Usuario',esquemaUsuario)

module.exports = Usuario