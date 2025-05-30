import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"



// Register User;

export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        if(err.code === 11000) {
            return res.status(400).json({error: "Email is already exists."});
        }
        res.status(500).json({error: err.message});
    }
}


// LOGGING IN
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        // if(!user) return res.status(400).json({msg: "User does not exist."})
        if(!user) throw new Error("User does not exist.");

        const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials."});
        if(!isMatch) throw new Error("Invalid Credentials.");

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY);

        // Convert Mongoose document to a plain object
        const userObject = user.toObject();
        delete userObject.password;

        res.status(200).json({token, user:userObject});

    }catch(err){
        res.status(500).json({error: err.message});
    }
}
