const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isemail')
const { validate } = require('./Curso')

const EsquemaAlumno = new mongoose.Schema({
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
    curso:{
        type:mongoose.Schema.Types.nombre,
        ref:"Curso"
    }

})

const Alumno = mongoose.model('Alumno',EsquemaAlumno)

module.exports = Alumno