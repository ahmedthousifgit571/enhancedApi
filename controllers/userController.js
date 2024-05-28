const User = require("../models/userModel");

// Load Register
const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};

// Insert User
const insertUser = async (req, res) => {
  try {
    // Get the current count of users
    const userCount = await User.countDocuments();
    const newUserId = userCount + 1; // Set the id to userCount + 1

    const user = new User({
      id: newUserId,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      image: req.file.filename,
      password: req.body.password,
      is_admin: 0,
    });

    const userData = await user.save();
    if (userData) {
      res.render("registration", { message: "Registration successful" });
    } else {
      res.render("registration", { message: "Registration unsuccessful" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Login User
const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    res.setHeader("Cache-Control", "no-store");

    const userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.password === password) {
        req.session.user_id = userData._id;
        res.redirect("/home");
      } else {
        res.render("login", { message: "Password is incorrect" });
      }
    } else {
      res.render("login", { message: "Email is not registered" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Load Home
const loadHome = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.user_id });
    res.render("home", { user: userData });
  } catch (error) {
    console.log(error.message);
  }
};

// User Logout
const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// User Profile Edit and Update
const editLoad = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await User.findById({ _id: id });
    if (userData) {
      res.render("edit", { user: userData });
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
    };

    if (req.file) {
      updates.image = req.file.filename;
    }

    const userData = await User.findByIdAndUpdate(
      { _id: req.body.user_id },
      { $set: updates }
    );
    res.redirect("/home");
  } catch (error) {
    console.log(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
      const userId = parseInt(req.params.id);
      const user = await User.findOne({ id: userId });

      if (user) {
          // Fetch user's role from the database
          const loggedInUser = await User.findById(req.session.user_id);

          res.render('profile', { status: 200, user, loggedInUser });
      } else {
          res.render('profile', { status: 404, message: 'User not found' });
      }
  } catch (error) {
      console.log(error.message);
      if (!res.headersSent) {
          res.render('profile', { status: 500, message: 'An error occurred while fetching the user' });
      }
  }
}


module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  editLoad,
  updateProfile,
  getUserById, // Export the new function
};
