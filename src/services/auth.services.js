const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authUser = async (body) => {
    try{
        const {username, password} = body;
        const user = await User.findOne({username: username});
        
        if (user == null){
            return {success: false, message: "username not found"};
        }else{
            const is_correct = await bcrypt.compare(password, user.password);
            if (is_correct){
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                return {success: true, message: "Successfully logged in", username: user.username, token: token};
            }else{
                return {success: false, message: "incorrect password!"};
            }
        }
    }catch(err){
        return {success: false, message: err.message};
    }
};

const authUpdateUser = async (body) => {
    try{
        const {id, new_username, new_password} = body; 
        const user = await User.findById(id);
        const user_ = await User.findOne({new_username});
        if (user_){
            return {success: false, message: "username is already used"};
        }
        
        user.username = new_username;
        const hashed = await bcrypt.hash(new_password, 10);
        user.password = hashed;

        await user.save();
        return {success: true, message: "User updated successfully", data: user};
    }catch (error){
        return {message: error.message};
    }
}

module.exports = {
    auth: {
        user: authUser,
        update: authUpdateUser
    }
};