import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :{
        type: String,
        required: true,
        unique: true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password :{
        type: String,
        required: true,
    },
    userType :{
        type: String,
        enum: ["tenant", "admin","owner"],
        required: true,
    }

},{timestamps: true});

userSchema.statics.signUp = async function(username,password,email,userType){

    console.log("Raw email value:", JSON.stringify(email));

    if(!username || !email || !password){
        throw Error("Please fill all fields");
    }
    if(!validator.isEmail(email.trim())){
        throw Error("Please enter a valid email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Please enter a strong password");
    }
    if(userType && !["tenant", "admin", "owner"].includes(userType)){
        throw Error("Invalid user type");
    }

    const exists = await this.findOne({email});
    if(exists){
        throw Error("Email already in use");
    }
    const existusername = await this.findOne({username});
    if(existusername){
        throw Error("Username already in use");
    }
    

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const response = await this.create({username, email, password: hash,userType});
    if(!response){
        throw Error("Failed to create user");
    }
    return {username : response.username, message: "User created successfully", _id:response._id};
}

userSchema.statics.login = async function(username, password){
    if(!username || !password){
        throw Error("Please fill all fields");
    }
    
    console.log(username, password);
    const response = await this.findOne({username});
    if(!response){
        throw Error("Invalid username");
    }
    const match = await bcrypt.compare(password, response.password);
    if(!match){
        throw Error("Invalid password");
    }
    return {username:response.username, message: "User logged in successfully", _id:response._id};
}
  


const User = mongoose.model('User', userSchema);
export default User;
