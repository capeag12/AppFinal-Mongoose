const express = require('express');
require('./db/mongoose')
const juegosRouter = require("./Routers/RouterJuegos")
const usuariosRouter = require("./Routers/RouterUsuario")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(juegosRouter)
app.use(usuariosRouter)

app.listen(port, ()=>{
    console.log("El server está despierto en el puerto "+port)
})