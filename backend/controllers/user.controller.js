const Users = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const errorHelper = require('../helpers/error.helper')
const filename = "user.controller.js"
const loginFunction = require('../functions/login.function.js')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const type = "user"


//---------------------------------- Create user to database --------------------------------------
exports.createUser = async (req, res) => 
{
    const functionName = "createUser"
    const request = "created"
    let id
    let token

    try
    {   

        bcrypt.genSalt(10, function(err, salt) 
        {
            bcrypt.hash(req.body.password, salt, function(err, hash) 
            {
                
                const user = new Users(
                {
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                })
            
                user.save()
                .then(async data => 
                { 
                    id = data._id
                    token = jwt.sign({id}, process.env.JWTSECRET, 
                    {
                        expiresIn: "7d",
                    })
                    
                    await Users.updateOne({_id: id}, {token : token }, {new: true})
                    .then(user => { if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id) })
                    .catch(err => { return errorHelper.contentError(res, type, request, err) })

                    return errorHelper.contentFoundIdToken(res, type, request, id, token) 
                })
                .catch(err => { return errorHelper.contentError(res, type, request, err) })
                
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file ${filename}.\nServer status : The followed error is ${error}`)
    }
}








//---------------------------------- get all users --------------------------------------


exports.getUsers = async (req, res) => 
{
    const functionName = "getUsers"
    const request = "receive"
    const token = req.headers["x-access-token"]

    try
    {
        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)

                if(resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined)
                {
                    //Find all the users
                    await Users.find().select('-__v')
                    .then(user => { return errorHelper.contentFound(res, type, request, user) })
                    .catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }

    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
        
};








//---------------------------------- get users by id --------------------------------------

exports.getUser = async (req, res) => 
{
    const functionName = "getUser"
    const request = "receive"
    const token = req.headers["x-access-token"]

    try
    {

        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {

                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)
                if(
                    resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined 
                    ||
                    resultRole.state == true && resultRole.id.toString() == req.params.id.toString() && resultRole.role != undefined
                )
                {
                    //Get user by id 
                    await Users.findById(req.params.id)
                    .populate('crypto','-__v')
                    .then(user => 
                    {
                        //Check if user exist
                        if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, user)
                        
                    }).catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file ${filename}.\nServer status : The followed error is ${error}`)
    }
};
 








//---------------------------------- get users by mail --------------------------------------

exports.getUserByMail = async (req, res) => 
{
    const functionName = "getUserByMail"
    const request = "receive"
    const token = req.headers["x-access-token"]

    try
    {        

        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)
                if(resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined)
                {

                    //Get user by email
                    await Users.find({email: req.query.email})
                    .then(user => 
                    {
                        //Check if user exist
                        if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, user)
                        
                    }).catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
};
 







//---------------------------------- update user by id --------------------------------------

exports.updateUser = async (req, res) => 
{

    const functionName = "updateUser"
    const request = "updated"
    const token = req.headers["x-access-token"]

    try
    {

        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)
                if(
                    resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined 
                    ||
                    resultRole.state == true && resultRole.id.toString() == req.params.id.toString() && resultRole.role != undefined
                )
                {
                    //Encrypt the new password if change
                    bcrypt.genSalt(10, function(err, salt) 
                    {
                        bcrypt.hash(req.body.password, salt, function(err, hash) 
                        {
                            //update the user
                            Users.updateOne({_id: req.params.id},
                            {
                                email: req.body.email,
                                username: req.body.username,
                                password: hash,
                                role: req.body.role,
                                image: req.body.image, 

                            }, {new: true})
                            .then(user => 
                            {
                                //Check if user exist
                                if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                                else return errorHelper.contentFound(res, type, request, user)
                                
                            }).catch(err => { return errorHelper.contentError(res, type, request, err) })
                        })
                    })
                }else return errorHelper.contentNoAccess(res, resultRole.role)    
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
}







//---------------------------------- delete user by id --------------------------------------

exports.deleteUser = async (req, res) => 
{
    const functionName = "deleteUser"
    const request = "deleted"
    const token = req.headers["x-access-token"]

    try
    {

        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)
                if(
                    resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined 
                    ||
                    resultRole.state == true && resultRole.id.toString() == req.params.id.toString() && resultRole.role != undefined
                )
                {
                    //Remove the user
                    await Users.deleteOne({_id: req.params.id})
                    .then(async user => 
                    {
                        //Check if user exist
                        if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, {state: true, message: "the user have been deleted"})
                        
                    }).catch(err => { return errorHelper.contentError(res, type, request, err) })  

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
}













//---------------------------------- logout user by id --------------------------------------

exports.logoutUser = async (req, res) => 
{

    const functionName = "logoutUser"
    const request = "logout"
    const token = req.headers["x-access-token"]

    try
    {
        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else
        {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                //Check if he have the right to do that
                let resultRole = await loginFunction.checkRole(token)
                if(
                    resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined 
                    ||
                    resultRole.state == true && resultRole.id.toString() == req.params.id.toString() && resultRole.role != undefined
                )
                {   
                    //update the token user for logout
                    Users.updateOne({_id: req.params.id},
                    {
                        token: "", 
                    }, {new: true})
                    .then(user => 
                    {
                        //Check if user exist
                        if(user.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, user)
                        
                    }).catch(err => { return errorHelper.contentError(res, type, request, err) })
                      
                }else return errorHelper.contentNoAccess(res, resultRole.role)    
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
}