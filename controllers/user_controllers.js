const User = require("../models/user_model");

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
        const {username, password} = req.body;
        const user = await User.findOne({username: username, password: password});
        
        if (user == null){
            res.status(400).json({success: false, message: "Invalid username or password"});
        }else{
            res.status(200).json({success: true, message: "Successfully logged in", data: user});
        }
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.createUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const new_user = await new User({username, password});
        const user = await User.findOne({username});
        
        if (user){
            res.status(400).json({success: false, message: "Username is already used"});
        }else{
            await new_user.save();
            res.status(201).json({success: true, message: "Successfully created user", data: new_user});
        }
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.updateUser = async (req, res) => {
    try{
        const user_id = req.query.id;
        const {username, password} = req.body; 
        const user = await User.findById(user_id);
        const user_ = await User.findOne({username});
        if (user_){
            res.status(400).json({success: false, message: "Username is already used"});
        }else{
            user.username = username;
            user.password = password;

            await user.save();
            res.status(200).json({success: true, message: "User updated successfully", data: user});
        }
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const user_id = req.query.id;
        const user_ = await User.findById(user_id);
        if (!user_){
            return res.status(400).json({success: false, message: 'User is not found'});
        }

        await User.findByIdAndDelete(user_id);
        return res.status(200).json({success: true, message: "User deleted successfully", data: user_});
    }catch (error){
        return res.status(500).json({message: "Id not found"});
    }
}

