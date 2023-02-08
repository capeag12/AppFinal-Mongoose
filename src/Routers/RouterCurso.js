const { calculateObjectSize } = require('bson')
const express = require('express')
const Curso = require('../models/Curso')
const router = new express.Router()

router.post('/crearCurso',async (req,res)=>{
    const body = req.body

    if (!body.nombre || !body.notaMedia) {
        res.status(404).send("No has enviado bien el JSON")
    }
    
    const curso = new Curso(body)
    console.log(body)
    try {
        await curso.save()
        res.status(201).send(curso)
    } catch (e) {
        res.status(400).send(e)
    }
    

})

router.get('/cursos', async (req,res)=>{
    try {
        const cursos = await Curso.find({})
        res.status(201).send(cursos)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/curso/:nombre', async (req,res)=>{
    const nombre = req.params.nombre
    console.log(req.params)
    try {
        const curso = await Curso.find(req.params, (err, respuesta)=>{
            if (!err) {
                
            }
        })

        if (!curso) {
            return res.status(404).send("No existe ningún curso")
        }
        else{
            return res.status(201).send(curso)
        }

    } catch (error) {
        res.status(500).send(error)
    }

})





module.exports = router