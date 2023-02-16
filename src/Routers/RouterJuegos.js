const { calculateObjectSize } = require('bson')
const express = require('express')
const auth = require('../middleware/auth')
const Juego = require('../models/Juego')
const Usuario = require('../models/Usuario')
const router = new express.Router()

router.get("/obtenerJuegos",async(req,res)=>{
    try{
        let juegos = Juego.findAll()
        
        res.send(juegos)
    }catch(e){
        res.status(500).send()
    }
})

router.get("/obtenerJuego/:id", async(req,res)=>{
    const id = req.params.id
    try{
        let juego = Juego.findOne({id})

        if(!juego){
            return res.status(400).send("No existe")
        }

        res.send(juego)

    } catch(e){
        res.status(500).send()
    }

})

router.get("/obtenerJuegosUsuario", auth, async(req,res)=>{
    try{
        let usuario = await Usuario.findById(req.usuario._id).populate('juegos')
        res.send(usuario.juegos)
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.post("/addJuego", auth, async(req,res)=>{
    const juego = new Juego({
        ...req.body,
        seller:req.usuario._id})

    try {
        await juego.save()
        res.status(201).send(juego)
    } catch (error) {
        res.status(400).send("Error al crear")
    }

})


module.exports = router