const Users = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

exports.getLogin = async (req, res) =>
{
    const email = req.body.email
    const password = req.body.password

    Users.findOne({ email: email }).select('-__v').then(result =>
    {
        if(result.email)
        {
            bcrypt.compare(password, result.password, (error, response) =>
            {
                if(response)
                {
                    const id = result.id
                    const token = jwt.sign({id}, process.env.JWTSECRET,
                    {
                        expiresIn: "7d",
                    })

                    Users.updateOne({email: result.email}, {token: token}, {new: true})
                    .then(data =>
                    {
                        res.status(200).json(
                        {
                            auth: true,
                            message: "You are logged !",
                            token: token,
                            id: result._id
                        })
                    })
                    .catch(error => res.status(404).json(
                    {
                        state: false,
                        message: "Une erreur est survenu",
                        error : "The user does not exist on the database"
                    }))

                }else{ res.status(300).json({state: false, auth: false, message: `Mauvais email/password`}) }
            })

        }else{ res.json({auth: false, message: `The user does not exist on the database`}) }

    }).catch(error => {
        res.status(500).json(
        {
            message: "An error append!",
            error: error
        })
    })
}