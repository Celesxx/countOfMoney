const Crypto = require('../models/crypto.model.js')
const errorHelper = require('../helpers/error.helper')
const filename = "crypto.controller.js"
const loginFunction = require('../functions/login.function.js')
const cryptoFunction = require('../functions/crypto.function.js')
const jwt = require('jsonwebtoken')
const { create } = require('../models/crypto.model.js')
require("dotenv").config()

const type = "crypto"


//---------------------------------- Post crypto to dashboard --------------------------------------
exports.createCrypto = async (req, res) => 
{
    const functionName = "createCrypto"
    const request = "created"
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
                    //Create crypto
                    const crypto = new Crypto(
                    {
                        name: req.body.name,
                        url: req.body.url,
                        code: req.body.code,
                    })
                    
                    infoscrypto = cryptoFunction.getCoinList(req.body.code)
                    infoscrypto.then(result => {         
                        crypto.save()
                        .then(crypto => {
                            return errorHelper.contentFound(res, type, request, crypto) 
                        })
                        .catch(err => { return errorHelper.contentError(res, type, request, err) })                 
                    })
                    .catch(err => {
                        return errorHelper.contentError(res, type, request, err) 
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


// ---------------------------------- Post crypto to dashboard --------------------------------------
exports.listCryptos = async (req, res) => 
{
    const functionName = "listCryptos"
    const request = "listed"
    const token = req.headers["x-access-token"]
    const CryptoCoins = [];

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
                const crypto = await Crypto.find();

                for await (const dbcrypto of crypto) {
                    const cryptoInfo = await cryptoFunction.getCoinList(dbcrypto.code);

                    try {
                        CryptoCoins.push(cryptoInfo)
                        for (const infos of CryptoCoins) {
                            delete infos.description;
                            delete infos.links;
                        }
                        
                    } catch (error) {
                        throw new Error(error);
                    }
                }

                return errorHelper.contentFound(res, type, request, CryptoCoins) 
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }

}

