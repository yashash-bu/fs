const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.createUser = async(req,res,next)=>{
    try{
        const user = await User.create(req.body);
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    }
    catch(e){
        res.status(400).json({
            status:"Failed to create user"
        });
    }
}

exports.getAllUser = async(req,res,next)=>{
    try{
        const userList = await User.find();
        res.status(200).json({
            status:"success",
            count: userList.length,
            data:{
                userList
            }
        });
    }
    catch(e){
        res.status(400).json({
            status:"Failed to get all user"
        });
    }
}

exports.getOneUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    }
    catch(e){
        res.status(400).json({
            status:"Failed to get user"
        });
    }
}

exports.updateUser = async(req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status:"success",
            data:{
                user: updatedUser
            }
        });
    }
    catch(e){
        res.status(400).json({
            status:"Failed to update user"
        });
    }
}

exports.deleteUser = async(req,res,next)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:"success",
            data: {
                user: deletedUser
            }
        });
    }
    catch(e){
        res.status(400).json({
            status:"Failed to delete user"
        });
    }
}

exports.loginUser = async (req, res, next) => {
    const { userEmail, userPass } = req.body;

    if (!userEmail || !userPass) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide email and password"
        });
    }

    const user = await User.findOne({ userEmail });
    if (!user || !(await bcrypt.compare(userPass, user.userPass))) {
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password"
        });
    }

    res.status(200).json({
        status: "success",
        data: { user }
    });
};