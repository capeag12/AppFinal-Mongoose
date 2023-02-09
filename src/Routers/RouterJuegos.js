const { calculateObjectSize } = require('bson')
const express = require('express')
const Juego = require('../models/Juego')
const router = new express.Router()

router.get("/obtenerJuegos",async(req,res)=>{
    try{
        let juegos = Juego.findAll()
        res.send(juegos)
    }catch(e){
        res.status(500).send()
    }

})


module.exports = router