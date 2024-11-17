const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const {auth} = require("../services/auth.services");

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({success: true, message: "Successfully retrieved all users", data: users});
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getUserById = async (req, res) => {
    try{
        const user_id = req.query.id;
        const user = await User.findById(user_id)
        if(user){
            res.status(200).json({success: true, message: "Successfully retrieved user", data: user});
        }else{
            res.status(400).json({success: false, message: "User not found"});
        }
    }catch (error){
        res.status(500).json({message: "Id not found"});
    }
};

exports.login = async (req, res) => {
    try{
        const resp = await auth.user(req.body);
        if (!resp.success){
            throw new Error(resp.message);
        }

        res.status(200).json(resp);
    }catch (error){
        res.status(500).json({success: false, message: error.message});
    }
};

exports.createUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.findOne({username});
        
        if (user){
            res.status(400).json({success: false, message: "Username is already used"});
        }else{
            const new_user = await new User({username, password: hashed});
            await new_user.save();

            const resp = await auth.user({username, password});
            res.status(201).json({success: true, message: "Successfully created user", username: resp.username, token: resp.token});
        }
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.updateUser = async (req, res) => {
    try{
        const user_id = req.user.id;
        req.body.id = user_id;
        const resp = await auth.update(req.body);
        if (!resp.success){
            throw new Error(resp.message);
        }

        resp.success = undefined;
        res.status(200).json({success: true, message: resp.message, data: resp.data});
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const user_id = req.user.id;
        await User.findByIdAndDelete(user_id);
        return res.status(200).json({success: true, message: "User deleted successfully"});
    }catch (error){
        return res.status(500).json({message: "Id not found"});
    }
}

