import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        // check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({error: "User already exists"});
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
