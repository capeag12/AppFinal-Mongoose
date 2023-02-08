const mongoose = require("mongoose");

const Curso = mongoose.model("Curso",{
    nombre:{
        type:String,
        require:true,
        trim:true
    },

    notaMedia:{
        type:Number,
        default:0
    }
})

module.exports = Curso