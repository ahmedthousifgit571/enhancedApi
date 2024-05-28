const express = require("express");
const user_route = express();
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const config = require("../config/config");
const auth = require("../middleware/auth");

user_route.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

user_route.use(express.json());
user_route.use(express.urlencoded({ extended: true }));
user_route.use(express.static("public"));
user_route.use("/css", express.static(__dirname + "public/css"));
user_route.use("/public", express.static("public", { extensions: ["js"] }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");
const userController = require("../controllers/userController");

user_route.get("/register", auth.isLogout, userController.loadRegister);
user_route.post("/register", upload.single("image"), userController.insertUser);

user_route.get("/", auth.isLogout, userController.loginLoad);
user_route.get("/login", auth.isLogout, userController.loginLoad);
user_route.post("/login", userController.verifyLogin);
user_route.get("/home", auth.isLogin, userController.loadHome);
user_route.get("/logout", auth.isLogin, userController.userLogout);
user_route.get("/edit", auth.isLogin, userController.editLoad);
user_route.post("/edit", upload.single("image"), userController.updateProfile);
user_route.get("/user/:id", auth.isLogin, userController.getUserById);

module.exports = user_route;
