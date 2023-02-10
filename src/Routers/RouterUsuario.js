const express = require("express")
const auth = require("../middleware/auth")
const Usuario = require("../models/Usuario")
const router = new express.Router()

router.post("/registrarUsuario", async (req,res)=>{
    const usuario = new Usuario(req.body)
    
    try {
        await usuario.save()
        const token = await usuario.generarTokenAuth()
        res.status(201).send({usuario,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/loginUsuario", async (req,res)=>{
    console.log("Entrado")
    try {
        console.log("Entrado")
        const usuario = await Usuario.findByCredenciales(req.body.email, req.body.passwd)
        console.log("Entrado")
        const token = await usuario.generarTokenAuth()
        console.log("Entrado")
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("usuarios/logout", auth,async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send("Deslogueado")
    } catch (e) {
        res.status(500).send()
    }
})

router.post("usuarios/logoutAll", auth, async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

router.get('usuarios/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.delete('/users/me',auth, async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.usen)
    } catch (error) {
        res.status(500).send()
    }

})

module.exports = router