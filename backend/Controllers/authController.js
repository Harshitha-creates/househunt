import mongoose from 'mongoose';
import User from '../Schemas/authSchemas.js'; 
import  jwt from 'jsonwebtoken'; 

const createToken = (id,username) => {
    return jwt.sign({id,username}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

 const signup = async(req, res) => {
    const {username, password,email,userType} = req.body;
       try {
        console.log(username, password, email,userType);
        const user = await User.signUp(username, password,email,userType);

        const token = await createToken(user._id, user.username);
        res.status(201).json({ username: user.username, token, message: "User created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
 }

 const login = async(req,res)=>{
     const {username, password} = req.body;
     try{
      const user = await User.login(username, password);
      const token = await createToken(user._id, user.username);
      res.status(200).json({ username: user.username, token, message: "User logged in successfully" });
     }
     catch(err){
         res.status(400).json({ error: err.message });
     }
 }

 export { signup ,login};