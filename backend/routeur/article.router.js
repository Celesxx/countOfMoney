var cors = require('cors')
module.exports = function(app) {
 
    app.use(cors())
    var articleContoller = require('../controllers/article.controller.js')
  
    app.post('/articles/create', articleContoller.createArticle)
    app.get('/articles/', articleContoller.getArticles)
    app.get('/articles/:id', articleContoller.getArticle)
    app.put('/articles/:id', articleContoller.updateArticle)
    app.delete('/articles/:id', articleContoller.deleteArticle)
}