const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

const userAuth = async(req,res,next)=>{
 try {
    const {token} = req.cookies;
    if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "Authentication Failed!!! No Token found"
            })
        }
        const {userId} =  await jwt.verify(token,process.env.JWT_SECRET);

    if(!userId)
    {
        return res.status(404).json({
            success: false,
            message: "Token expired"
          })
    }

    const user = await User.findById({_id:userId});

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "User not found"
          })
    }

    req.user = user;

    next();

 } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

module.exports = userAuth