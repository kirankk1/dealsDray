import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res)=>{
    res.json({message: 'API is working'});
    
}

export const signout = async (req, res, next) => {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "User has been signed out" });
    } catch (error) {
      next(error);
    }
  };