const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/user_managment_system")

const express = require('express')
const nocache = require('nocache')
const app = express()
app.use(nocache())

// for user routes


// for admin routes


app.listen(3000,()=>{
    console.log("Port running at http://localhost:3000/ ");
})
