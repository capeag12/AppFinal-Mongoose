const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isemail')
const { validate } = require('./Curso')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const EsquemaUsuario = new mongoose.Schema({
    nombre:{
        type:String, 
        required:true,
        trim:true
    },
    correoElectronico:{
        type:String,
        required:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("El correo es invalido")
            }
        }
    },
    contraseña:{
        type:String,
        required:true,
        validate(value){
            if (value.toLowerCase().includes('contraseña') || value.toLowerCase().includes('1234')) {
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

EsquemaUsuario.methods.toJSON = function (){
    const usuario = this
    const objUsuario = usuario.toObject()

    delete objUsuario.password
    
    return objUsuario
}

EsquemaUsuario.static.findByCredenciales = async (email, passwd)=>{
    const usuario = await Usuario.findOne({email})

    if (!user) {
        throw new Error("No existe el email")
    }

}

const Usuario = mongoose.model('Usuario',EsquemaUsuario)

module.exports = Usuario