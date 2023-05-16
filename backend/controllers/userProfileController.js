var userProfileService = require('../services/userProfileService.js');
var userProfiles = require('../models/userProfiles.js');
const { promisify } = require("util");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

var createUserProfileControllerFn = async (req, res) => {
    try {
        var user = await userProfileService.createUserProfileService(req.body);
        if (user) {
            createSendToken(user, 200, res);
        } else {
            res.send({ "status": false, "message": "User creation failed" });
        }
    } catch {
        console.error();
    }
}

var updateUserProfileController = async (req, res) => {

    var result = await userProfileService.updateUserProfileDBService(req.params.id, req.body);

    if (result) {
        res.send({ "status": true, "message": "User updated successfully" });
    } else {
        res.send({ "status": false, "message": "User not updated" });
    }
}

var getAllUserProfileControllerFn = async (req, res) => {
    try {
        var employees = await userProfileService.getUserProfileFromDBService();
        res.send({ "status": true, "data": employees });
    } catch {
        console.error();
    }
}


var deleteUserProfileController = async (req, res) => {

    var result = await userProfileService.removeUserProfileDBService(req.params.id);

    if (result) {
        res.send({ "status": true, "message": "User Deleted" });
    } else {
        res.send({ "status": true, "message": "Error deleting user" })
    }
}

const getUserProfileById = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such record" })
    }

    const record = await userProfiles.findById(id)
    if (!record) {
        return res.status(404).json({ error: "No such record" })
    }
    res.status(200).json(record)
}

const searchUserProfile = async(req,res) => {
    let result = await userProfiles.find({
        "$or":[
            {
                name: {$regex: req.params.key}
            },
            {
                department: {$regex: req.params.key}
            },
            {
                userRole: {$regex: req.params.key}
            },
            {
                employeeId: {$regex: req.params.key}
            }
        ]
    });
    res.send(result);
}

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

const protect = async (req, res, next) => {
    // Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("You are not logged in! Please log in to get access.", 401)
        );
    }

    //Verification token. This will return promise. 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await userProfiles.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE AND SET USER
    req.user = currentUser;
    next();
};

const logout = async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
    });
};

require("../models/userProfilesPics")
const Images = mongoose.model("userProfilesPics")

const setProfilePicture = async(req,res) => {
    const {base64} = req.body;
    try{
        Images.create({image:base64});
        res.send({Status:"ok"})
    } catch (error){
        res.send({Status:"error",data:error})
    }
}

module.exports = { createUserProfileControllerFn, updateUserProfileController, getAllUserProfileControllerFn, deleteUserProfileController, getUserProfileById, searchUserProfile, setProfilePicture, protect, createSendToken, logout };