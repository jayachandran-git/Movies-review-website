const bcrypt = require('bcryptjs')
const User = require('../modals/userModal');
const generateToken = require('../utils/generateToken')


const registerUser = async(req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({ err : "Please fill all the fields"})
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({ err: "User Already Exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password : hashedPassword
    })
    if(user){
        return res.status(201).json({
            id:user._id, name:user.name, email:user.email,status:"user created"
        })
    }
    else{
        return res.status(400).json({msg :"Invalid user Data"})
    }
}


const loginUser = async(req, res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user&&(await bcrypt.compare(password,user.password))){
        return res.json({
            _id : user._id,
            email: user.email,
            token : generateToken(user._id),
            status:"Login Successfully"
        })
    }
    else{
        return res.status(404).json({msg:"Invalid User Data"})
    }

}


const userProfile = async(req, res) => {
    try{
    const {_id, email, name} = await User.findById(req.user.id);
     return res.status(200).json({_id, name, email})
    }catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}

const logout = (req, res) => {
    res.clearCookie('token');  
    res.status(200).json({ message: 'Logged out successfully' });
  };

module.exports = {registerUser, loginUser, userProfile, logout}