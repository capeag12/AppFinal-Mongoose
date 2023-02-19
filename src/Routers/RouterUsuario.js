const express = require("express")
const auth = require("../middleware/auth")
const Juego = require("../models/Juego")
const Usuario = require("../models/Usuario")
const router = new express.Router()

router.post("/registrarUsuario", async (req,res)=>{
    const usuario = new Usuario(req.body)
    let findUsu = await Usuario.exists({email:usuario.email})
    
    console.log(findUsu)

    if (findUsu) {
        return res.status(400).send("Este mail ya está registrado")
    }
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

router.post("/loginUsuarioToken", auth, async(req,res)=>{
    try{
        res.status(200).send(req.usuario)
    }
    catch(e){
        req.status(400).send("No se ha podido loguear con este token")
    }

})

//Acepta el id del juego
router.post("/usuario/comprarJuego/:id", auth, async(req,res)=>{
    let juego = await Juego.findById(req.params.id)
    juego.usuariosCompradores.push(req.usuario._id)
    juego.save()

    let usuario = await Usuario.findById(req.usuario._id).populate('juegosComprados')
    res.send(usuario.juegosComprados)

})

router.post("/logout", auth,async (req, res)=>{
    
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.usuario.save()
        res.send("deslogueado")
        console.log("logout")
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