const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/user.model.js')
const filename = "login.function.js"
require("dotenv").config()


exports.decryptToken = (token) => 
{
    const functionName = "decryptToken"
    let result
    try 
    {
        jwt.verify(token, process.env.JWTSECRET, (error, decoded) =>
        {
            if(error) result = { 
                auth: false,
                state:  false,
                message: "You seems to be not logged, please login",
                error : error,
    
            }
            else result = {
                auth: true,
                state: true,
                message: "You are logged !"
            }
        }) 
    } catch (error) 
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }

    return result
}





exports.checkRole = async (token) => 
{
    const functionName = "checkRole"
    let result = {}
    
    try
    {
        await Users.find({token: token}).then(data => 
        {
            result = 
            {
                state: true,
                role : data[0].role,
                id: data[0]._id
            }
        }).catch(error => 
        {
            result = 
            {
                state: false,
                message: `An error append, cannot find the users`,
                error: error
            }
        })

        return result

    }catch
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }


    return result
}