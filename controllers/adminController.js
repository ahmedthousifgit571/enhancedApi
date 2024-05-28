const User = require('../models/userModel');
const admin_route = require('../routes/adminRoute');





const loginLoad = async (req, res) => {
    try {

        res.render('login')

    } catch (error) {
        console.log(error.message);
    }
}


const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

      
        const userData = await User.findOne({ email: email });

        if (userData) {
           
            if (userData.password === password) {
               

                if (userData.is_admin === 0) {

                    res.render('login', { message: 'Your are not Authorised' })


                } else {

                    req.session.user_id = userData._id;
                    res.redirect('/admin/home');
                }


            } else {
                
                res.render('login', { message: "Password is incorrect" });
            }
        } else {
           
            res.render('login', { message: "Email is not registered" });
        }
    } catch (error) {
        console.log(error.message);
    }
};




const loadDashboard = async (req, res) => {


    try {
        const userData = await User.findById({ _id: req.session.user_id })

        res.render('home', { admin: userData })

    } catch (error) {
        console.log(error.message);

    }



}


const logout = async (req, res) => {
    try {
        req.session.destroy();

        res.redirect('/admin')

    } catch (error) {
        console.log(error.message);
    }
}


const adminDashboard = async (req, res) => {
    try {
        var search="";

        if(req.query.search){
            search= req.query.search;
        }

        const usersData = await User.find({ 
            is_admin: 0,
        $or:[
            {name:{$regex:'.*'+search+'.*',$options:'i'}},
            {email:{$regex:'.*'+search+'.*',$options:'i'}},
            {mobile:{$regex:'.*'+search+'.*',$options:'i'}},
        ] })

        res.render('dashboard', { users: usersData })

    } catch (error) {
        console.log(error.message);

    }

}


const newUserLoad = async (req, res) => {
    try {

        res.render('new-user')

    } catch (error) {
        console.log(error.message);

    }


}

const addUser = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const newUserId = userCount + 1;
        const user = User({
            id: newUserId,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            image: req.file.filename,
            password: req.body.password,
            is_admin: 0


        })
        const userData = await user.save();

        if (userData) {
            res.render("Registration", { message: "registration success" })
            res.redirect('/admin/dashboard')

        } else {
            res.render("Registration", { message: "registration unsucessful" })
        }

    } catch (error) {
        console.log(error.message);
    }

}


const editUserLoad = async (req, res) => {
    try {
        const id = req.query.id

        const userData = await User.findById({ _id: id })
        if (userData) {
            res.render('edit-user', { user: userData })

        } else {
            res.redirect('/admin/dashboard')

        }

    } catch (error) {
        console.log(error.message);

    }
}


const updateUser = async (req, res) => {

    try {

        if (req.file) {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, mobile: req.body.mno, image: req.file.filename } })


        } else {
            const userData = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, mobile: req.body.mno } })

        }
        res.redirect('/admin/dashboard')

    } catch (error) {
        console.log(error.message);

    }

}


const deleteUser= async(req,res)=>{

    try {
        const id = req.query.id;
        await User.deleteOne({_id:id})
        res.redirect('/admin/dashboard')
        
    } catch (error) {
        console.log(error.message);
        
    }


}




module.exports = {
    loginLoad,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUser,
    deleteUser
}

