const mongoose = require("mongoose");

const esquemaJuego = new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },

    precio:{
        type:Number,
        default:0,
        require:true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    },
    usuariosCompradores:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    }]
    

    
})

esquemaJuego.methods.toJSON = function(){
    const juego = this
    const objJuego = juego.toObject()

    delete objJuego.usuariosCompradores
    
    return objJuego
}

const Juego = mongoose.model("Juego",esquemaJuego)

module.exports = Juego