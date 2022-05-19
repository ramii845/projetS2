const User=require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken =require('../utils/generateToken');
const { use } = require('express/lib/application');


const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token : generateToken(user._id)        
        
       
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });
  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password,user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token : generateToken(user._id)
        
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  });

module.exports={registerUser,authUser};