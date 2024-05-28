const User= require('../models/userModel')


const loadRegister= async(req,res)=>{
    try{

        res.render('registration')

    }catch(error){
        console.log(error.message);
    }
}


const insertUser = async(req,res)=>{
   try{

    const user = User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mno,
        image:req.file.filename,
        password:req.body.password,
        is_admin:0


    })
   const userData= await user.save();

   if(userData){
    res.render("Registration",{message:"registration successful"})
   }else{
    res.render("Registration",{message:"registration unsucessful"})
   }


   }catch(error){
    console.log(error.message);
   }

}


//login user methods

const loginLoad = async(req,res)=>{
    try{
        
        res.render('login',)
    
    }catch(error){
        console.log(error.message);
    }
}
 
const verifyLogin = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

        
    res.setHeader('Cache-Control', 'no-store');
  
     
      const userData = await User.findOne({ email: email });
  
      if (userData) {
        
        if (userData.password === password) {
         
          
          req.session.user_id=userData._id;
          res.redirect('/home');
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
  

const loadHome =async(req,res)=>{

    try{
        const userData= await User.findById({_id:req.session.user_id})
        res.render('home',{user:userData})

    }catch(error){
        console.log(error.message);
    }
}


const userLogout= async(req,res)=>{
  try{
    req.session.destroy();
    
    res.redirect('/')

  }catch(error){
    console.log(error.message);
  }
}

//user profile edit and update

const editLoad = async (req,res)=>{
  try {
    const id = req.query.id

    const userData=await User.findById({_id:id})
   if (userData) {
    res.render('edit',{user:userData})
    
   } else {
    res.redirect('/home')
    
   }
    
  } catch (error) {
    console.log(error.message);
    
  }
}


const updateProfile = async(req,res)=>{

  try {

    if (req.file) {
      const userData=await User.findByIdAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno,image:req.file.filename}})

      
    } else {
      const userData=await User.findByIdAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno}})
      
    }
    res.redirect('/home')
    
  } catch (error) {
    console.log(error.message);
    
  }

}

module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile
}