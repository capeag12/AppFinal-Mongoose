const mongoose = require("mongoose");

const Juego = mongoose.model("Curso",{
    nombre:{
        type:String,
        require:true,
        trim:true
    },

    precio:{
        type:Number,
        default:0,
        require:true
    }
})

module.exports = Juego