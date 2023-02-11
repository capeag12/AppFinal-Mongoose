const mongoose = require("mongoose");

const Juego = mongoose.model("Juego",{
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

    seller:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    }
})

module.exports = Juego