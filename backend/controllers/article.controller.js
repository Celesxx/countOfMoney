const Article = require('../models/article.model.js')
const errorHelper = require('../helpers/error.helper')
const loginFunction = require('../functions/login.function.js')
const filename = "article.controller.js"
const type = "article"



//---------------------------------- Create article to database --------------------------------------
exports.createArticle = async (req, res) => 
{
    const functionName = "createArticle"
    const request = "created"
    let token = req.headers["x-access-token"]

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
                    const article = new Article(
                    {
                        title: req.body.title,
                        url: req.body.url,
                        content: req.body.content,
                        tags: req.body.tags,
                        image: req.body.image,
                        source: req.body.source,
                        visible: req.body.visible,
                        published_at: req.body.published_at
                    })
                
                    await article.save()
                    .then(data => { return errorHelper.contentFound(res, type, request, data) })
                    .catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file ${filename}.\nServer status : The followed error is ${error}`)
    }
}















//---------------------------------- get all articles --------------------------------------


exports.getArticles = async (req, res) => 
{
    const functionName = "getArticles"
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

                if(resultRole.state == true && resultRole.role != undefined)
                {
                    //Find all the articles
                    await Article.find().select('-__v')
                    .then(article => { return errorHelper.contentFound(res, type, request, article) })
                    .catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }

    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
        
}


















//---------------------------------- get users by id --------------------------------------

exports.getArticle = async (req, res) => 
{
    const functionName = "getArticle"
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

                if(resultRole.state == true && resultRole.role != undefined)
                {
                    //Get article by id 
                    await Article.findById(req.params.id)
                    .then(article => 
                    {
                        //Check if article exist
                        if(article.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, article)
                        
                    }).catch(err => { return errorHelper.contentError(res, type, request, err) })

                }else return errorHelper.contentNoAccess(res, resultRole.role)
                
            }else return errorHelper.contentNotAuth(res, resultToken.auth, resultToken.message, resultToken.error)
        }
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file ${filename}.\nServer status : The followed error is ${error}`)
    }
};
 















//---------------------------------- update article by id --------------------------------------

exports.updateArticle = async (req, res) => 
{

    const functionName = "updateArticle"
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
                if( resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined)
                {
                   
                    //update article
                    Article.updateOne({_id: req.params.id},
                    {
                        title: req.body.title,
                        url: req.body.url,
                        content: req.body.content,
                        tags: req.body.tags,
                        image: req.body.image,
                        source: req.body.source,
                        visible: req.body.visible,
                        published_at: req.body.published_at 

                    }, {new: true})
                    .then(article => 
                    {
                        //Check if article exist
                        if(article.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
                        else return errorHelper.contentFound(res, type, request, article)
                        
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


















//---------------------------------- delete article by id --------------------------------------

exports.deleteArticle = async (req, res) => 
{
    const functionName = "deleteArticle"
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
                if(resultRole.state == true && resultRole.role == "admin" && resultRole.role != undefined)
                {
                    //Remove the article
                    await Article.remove({_id: req.params.id})
                    .then(async article => 
                    {
                        //Check if article exist
                        if(article.length == 0) return errorHelper.contentNotFound(res, type, request, req.params.id)
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


