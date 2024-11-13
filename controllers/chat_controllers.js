const Chat = require("../models/chat_model");

exports.getMyChats = async (req, res) => {
    try{
        const u_id = (req.query.id);
        const chat = await Chat.find({$or: [{sender: u_id}, {receiver: u_id}]}).sort({writtenAt: -1});

        res.status(200).json({success: true, message: "Chats retrieved successfully", data: chat});
    }catch (error){
        res.status(500).json({message: "Id not found"});
    }
};

exports.createChat = async (req, res) => {
    try{
        const {message, sender, receiver} = req.body;
        const new_chat = await new Chat({message, sender, receiver});
        
        await new_chat.save();
        res.status(201).json({success: true, message: "Create message succeed", data: new_chat});
    }catch (error){
        res.status(500).json({message: error.message});
    }
};