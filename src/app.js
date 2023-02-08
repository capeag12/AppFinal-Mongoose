const express = require('express');
require('./db/mongoose')
const cursoRouter = require("./Routers/RouterCurso")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cursoRouter)

app.listen(port, ()=>{
    console.log("El server está despierto en el puerto "+port)
})