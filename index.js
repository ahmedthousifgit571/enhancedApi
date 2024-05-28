const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/enhanced_user")

const express = require('express')
const nocache = require('nocache')
const app = express()
app.use(nocache())
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')


// for user routes
app.use('/',userRoute)

// for admin routes
app.use('/admin',adminRoute)

app.listen(3000,()=>{
    console.log("Port running at http://localhost:3000/ ");
})
