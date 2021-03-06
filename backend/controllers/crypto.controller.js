const Crypto = require('../models/crypto.model.js')
const errorHelper = require('../helpers/error.helper')
const filename = "crypto.controller.js"
const loginFunction = require('../functions/login.function.js')
const cryptoFunction = require('../functions/crypto.function.js')
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
                        visible: req.body.visible,
                    })

                    infoscrypto = cryptoFunction.getCoinsById(req.body.code)
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

// exports.listCryptos = async (req, res) => {

//     // Shows different things depending on the user role
//     // anonymous and members : the N most popular cryptocurrencies
//     // member with queries : a selection of cryptocurrencies
//     // admin : all the cryptocurrencies


//     try {
//         if (req.cookies.userToken) {
//             const user = verifyJWT(req.cookies.userToken, process.env.JWT_SECRET)
//             if (user) {
//                 req.user = await User.findById(user._id)
//             }
//         }

//         // If there are queries and the user is a member or admin
//         if (req.query.cmids && req.user?.role) {
//             const ids = req.query.cmids.split(',')
//             const result = []
//             for (let id of ids) {
//                 // check if id exists in the database, else don't push it to the result
//                 const crypto = await Crypto.findOne({ gecko: id })
//                 if (crypto) result.push(crypto)
//             }
//             return res.status(200).json(result);

//         } else if (!req.query.cmids && req.user?.role === 'admin') {

//             const cryptos = await Crypto.find({}).sort({ rank: 'asc'});
//             if (cryptos.length === 0) return res.status(404).json({ message: 'No cryptocurrencies found' })

//             return res.status(200).json(cryptos);
//         } else {
//             if (req.query.cmids) return res.status(403).json({ message: "You don't have the permissions to access this resource."})
//             const cryptos = await Crypto.find({}).sort({ rank: 'asc' });
//             return res.status(200).json(cryptos)
//         }

//     } catch (e) {
//         return res.status(500).json({ message: e.message })
//     }

// }
// ---------------------------------- List crypto to dashboard --------------------------------------
exports.listCryptos = async (req, res) =>
{
    const functionName = "listCryptos"
    const request = "listed"
    const token = req.headers["x-access-token"]
    const CryptoCoins = [];

    if (req.query.cmids) return res.status(403).json({ message: "You don't have the permissions to access this resource."})
    const cryptoInfo = await cryptoFunction.getCoinsList(15);

    return res.status(200).json(cryptoInfo)

    // try
    // {
        //Check if token is on the request
        // if(!token) res.json({ auth: false, message: "You have to be logged !"})
        // else
        // {
        //     //Check if the token is valid
        //     let resultToken = await loginFunction.decryptToken(token)
        //     if(resultToken.state == true & resultToken.auth == true)
        //     {
            // console.log("req",);
            //     if (req.query.cmids) {
            //         cmids = req.query.cmids.split(',');
            //         for (const cmid of cmids) {
            //             const crypto = await Crypto.find({ code: cmid })
            //             console.log("if crypto = ", crypto)
            //             try {
            //                 if (!crypto.length) {
            //                     return errorHelper.cryptoNotFound(res, type, request, cmid)
            //                 }
            //                 const cryptoInfos = await cryptoFunction.getCoinsById(cmid);
            //                 CryptoCoins.push(cryptoInfos)
            //                 for (const infos of CryptoCoins) {
            //                     delete infos.description;
            //                     delete infos.links;
            //                 }

            //             } catch (error) {
            //                 throw new Error(error);
            //             }
            //         }
            //         return errorHelper.contentFound(res, type, request, CryptoCoins)

            //     }
                //  else {
                //     const crypto = await Crypto.find();
                //     if (crypto.length) {
                //         for await (const dbcrypto of crypto) {
                //             const cryptoInfo = await cryptoFunction.getCoinsById(dbcrypto.code);
                //             console.log("else crypto = ", crypto)
                //             try {
                //                 CryptoCoins.push(cryptoInfo)
                //                 for (const infos of CryptoCoins) {
                //                     delete infos.description;
                //                     delete infos.links;
                //                 }

                //             } catch (error) {
                //                 throw new Error(error);
                //             }
                //         }
                //         return errorHelper.contentFound(res, type, request, CryptoCoins)

                //     } else {
                //         return errorHelper.cryptosNotFound(res, type, request);
                //     }
                // }

            // }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        // }
    // }catch(error)
    // {
    //     console.log(`Server status : An error append to this function ${functionName} in the followed file
    //     ${filename}.\nServer status : The followed error is ${error}`)
    // }

}


// ---------------------------------- Get crypto by Id to dashboard --------------------------------------
exports.GetById = async (req, res) =>
{
    const functionName = "GetById"
    const request = "founded"
    const token = req.headers["x-access-token"]
    const CryptoCoin = [];

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
                const crypto = await Crypto.find({ code: req.params.id })
                try {
                    if (!crypto.length) {
                        return errorHelper.cryptoNotFound(res, type, request, req.params.id)
                    }
                    const cryptoInfos = await cryptoFunction.getCoinsById(req.params.id);
                    CryptoCoin.push(cryptoInfos)
                    for (const infos of CryptoCoin) {
                        delete infos.description;
                        delete infos.links;
                    }
                } catch (error) {
                    throw new Error(error);
                }
                return errorHelper.contentFound(res, type, request, CryptoCoin)

            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file
        ${filename}.\nServer status : The followed error is ${error}`)
    }

}

// ---------------------------------- Get crypto by id and date to dashboard --------------------------------------
exports.GetByDate = async (req, res) =>
{
    const functionName = "GetByDate"
    const request = "founded at the date you wanted."
    const token = req.headers["x-access-token"]
    const CryptoCoin = [];

    try
    {
        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                const crypto = await Crypto.find({ code: req.params.id })
                try {
                    if (!crypto.length) {
                        return errorHelper.cryptoNotFound(res, type, request, req.params.id)
                    }
                    var checkDate = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])-([0]?[1-9]|[1][0-2])-([0-9]{4}|[0-9]{2})$/m.test(req.params.period.replace(' ', ''));
                    if ( !checkDate ) {
                        return errorHelper.cryptosWrongDateFormat(res, type, request, req.params.period)
                    }

                    const cryptoInfos = await cryptoFunction.getCoinByDate(req.params.id, req.params.period);
                    CryptoCoin.push(cryptoInfos)
                } catch (error) {
                    throw new Error(error);
                }
                return errorHelper.contentFound(res, type, request, CryptoCoin)

            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file
        ${filename}.\nServer status : The followed error is ${error}`)
    }

}


// ---------------------------------- Get crypto by id and history to dashboard --------------------------------------
exports.GetByHistory = async (req, res) =>
{
    const functionName = "GetByHistory"
    const request = "founded at the period you wanted."
    const token = req.headers["x-access-token"]
    const CryptoCoin = [];
    var time = ""
    var qty = ""

    try
    {
        //Check if token is on the request
        if(!token) res.json({ auth: false, message: "You have to be logged !"})
        else {
            //Check if the token is valid
            let resultToken = await loginFunction.decryptToken(token)
            if(resultToken.state == true & resultToken.auth == true)
            {
                const crypto = await Crypto.find({ code: req.params.id })
                try {
                    if (!crypto.length) {
                        return errorHelper.cryptoNotFound(res, type, request, req.params.id)
                    }

                    var period = req.params.period.replace(' ', '');
                    if ( period == 'daily' ) {
                        time = 'daily'
                        qty = '60'
                    }
                    else if ( period == 'hourly' ) {
                        time = 'hourly'
                        qty = '2'
                    }
                    else if ( period == 'minute' ) {
                        time = 'minutely'
                        qty = '0.415'
                    }
                    else {
                        return errorHelper.cryptosWrongPeriod(res, type, request)
                    }

                    const cryptoInfos = await cryptoFunction.getCoinByHistory(req.params.id, time, qty);
                    CryptoCoin.push(cryptoInfos)

                } catch (error) {
                    throw new Error(error);
                }
                return errorHelper.contentFound(res, type, request, CryptoCoin)

            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file
        ${filename}.\nServer status : The followed error is ${error}`)
    }

}


//---------------------------------- delete crypto by code to dashboard --------------------------------------
exports.deleteCrypto = async (req, res) =>
{
    const functionName = "deleteCrypto"
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
                    //Remove the crypto
                    await Crypto.deleteOne({ code: req.params.id})
                    .then(async crypto =>
                    {
                        //Check if crypto exist
                        if(crypto.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, {state: true, message: "the crypto have been deleted"})

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