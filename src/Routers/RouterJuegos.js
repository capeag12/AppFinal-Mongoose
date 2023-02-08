const { calculateObjectSize } = require('bson')
const express = require('express')
const Juego = require('../models/Juego')
const router = new express.Router()



module.exports = router