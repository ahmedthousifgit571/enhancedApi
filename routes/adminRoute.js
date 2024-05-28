const express =require('express');
const admin_route =express();
const session = require("express-session")
const config = require("../config/config")
const adminController =require("../controllers/adminController");
const auth = require("../middleware/adminAuth")
const multer= require('multer')
const path= require("path")


admin_route.use(express.static('public'))
//load static assets

admin_route.use('/css',express.static(__dirname+'public/css'))
admin_route.use("/public", express.static("public", { "extensions": ["js"] }));

const storage =multer.diskStorage({
    destination:function(req,file,cb){
     cb(null,path.join(__dirname,'../public/userImages'))
    },
    filename:function(req,file,cb){
      const name=Date.now()+'_'+file.originalname
      cb(null,name);
    }

})

const upload =multer({storage:storage});


admin_route.use(express.json());
admin_route.use(express.urlencoded({ extended: true }));

admin_route.use(session({
    secret: config.sessionSecret ,
    resave: false, 
    saveUninitialized: true, 
  }));

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');


admin_route.get('/',auth.isLogout,adminController.loginLoad)




admin_route.post('/',adminController.verifyLogin)

admin_route.get('/home',auth.isLogin,adminController.loadDashboard)

admin_route.get("/logout",auth.isLogin,adminController.logout)

admin_route.get("/dashboard",auth.isLogin,adminController.adminDashboard)

admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad)

admin_route.post('/new-user',upload.single('image'),auth.isLogin,adminController.addUser)

admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad)

admin_route.post('/edit-user',upload.single('image'),auth.isLogin,adminController.updateUser)

admin_route.get('/delete-user',adminController.deleteUser)

admin_route.get('*',(req,res)=>{
    res.redirect('/admin')
})

module.exports= admin_route;
