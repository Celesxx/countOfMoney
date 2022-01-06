module.exports = function(app) {

    var articleContoller = require('../controllers/article.controller.js')
    app.post('/articles/', articleContoller.createArticle)
    app.get('/articles/', articleContoller.getArticles)
    app.get('/articles/:id', articleContoller.getArticle)
    app.put('/articles/:id', articleContoller.updateArticle)
    app.delete('/articles/:id', articleContoller.deleteArticle)
}