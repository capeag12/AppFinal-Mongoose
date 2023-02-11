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
    try {
        const usuario = await Usuario.findByCredenciales(req.body.email, req.body.passwd)
        const token = await usuario.generarTokenAuth()
        res.send({usuario,token})
    } catch (error) {
        res.status(400).send("No se a podido logear")
    }
})

router.post("/logout", auth,async (req, res)=>{
    console.log("logout")
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.usuario.save()
        res.send("Deslogueado")
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/logoutAll", auth, async (req,res)=>{
    try {
        req.usuario.tokens = []
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/me',auth,async(req,res)=>{
    res.send(req.usuario)
})

router.delete('/me',auth, async (req,res)=>{
    try {
        await req.usuario.remove()
        res.send(req.usuario)
    } catch (error) {
        res.status(500).send()
    }

})

module.exports = router