import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




//login
export const login = async(req,res,next) =>{
try {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("User dosent exist", 400));
    
     const isMatch = await bcrypt.compare(password, user.password)
     
    
    if(!isMatch) return next(new ErrorHandler("User dosent exist", 400));
    
     sendCookies(user,res,`Welcome Back, ${user.name}`, 200); 
} catch (error) {
    next(error)
}
};


//register
    export const register = async (req,res, next)=>{
     try {
        const {name, email, password} = req.body;
        

        let user = await User.findOne({email});
   if(user) return next(new ErrorHandler("user already exist", 400));
        const hashedPass = await bcrypt.hash(password,10);
        user = await User.create({name, email, password:hashedPass});
   
       sendCookies(user,res, "Register Successfully", 201); 
     } catch (error) {
        next(error)
     }
        };

        

        export const getMyProfile = (req,res)=>{
              res.status(200).json({
                success: true,
                user:req.user,
            });

        };

//logout
        export const logout =(req,res)=>{
            res.status(200).cookie("token","", {expires:new Date (Date.now()), 
                sameSite: process.env.NODE_ENV === "Development"? "lax": "none",
                secure: process.env.NODE_ENV === "Development"? false : true,
            
            }).json({
                success: true,
                user:req.user,
            });
        }
       