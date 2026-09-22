const userModel =  require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"});
}

async function registerUser(req, res){

    try{
        const {name, email, password} = req.body;

        const UserExists = await userModel.findOne({email});

        if(UserExists){
            return res.status(400).json({
                message: "User already exists with this email",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await userModel.create({
        name,
        email,
        password: hashPassword,
        isVerified: false,
        otp,
        otpExpire: Date.now() + 10 * 60 * 1000
    });

        
        if(user){
            // Generate a mock OTP
            

            //Send Welcome / OTP Email

            const message =  `
            <h2>Welcome to Shopnest, ${name}!</h2>
            <p>Thank you for registering on our platform.</p>
            <p>Your ont-time verification/discount OTP is: <Strong>${otp}</Strong></p>`;

            await sendEmail({
                email: user.email,
                subject: "Welcome to ShopNest - Your OTP",
                message
            });

            res.status(201).json({
                message: "User register successfully",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }else{
            res.status(400).json({message: "Invalid user data"});
        }
    }catch(err) {
        res.status(500).json({message: err.message});
    }
} 

async function loginUser(req, res){
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }else{
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

async function getUsers(req, res){
    try{
        const users = await userModel.findOne({}).select("-password");
        res.json({
            message: "users fetched successfully",
            users
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerUser, 
    loginUser,
    getUsers
}