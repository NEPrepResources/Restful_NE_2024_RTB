const express = require('express')
const cors = require('cors')
const authRoutes= require('./routes/auth.routes')
require('dotenv').config()
const { protect }= require('./middleware/authMiddleware')

const app= express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/me', protect, (req,res)=>{
    res.send('Protected api')
})

app.get('/', (req,res)=>{
    res.send('Equipment rental system is running...')
})

module.exports = app;