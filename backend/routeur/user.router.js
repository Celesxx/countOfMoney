var cors = require('cors')
module.exports = function(app) {
 
    app.use(cors())
    var userController = require('../controllers/user.controller.js')
  
    app.post('/users/register', userController.createUser)
    app.get('/users/getUserByMail', userController.getUserByMail)
    app.get('/users/:id', userController.getUser)
    app.get('/users/', userController.getUsers)
    app.put('/users/:id', userController.updateUser)
    app.delete('/users/:id', userController.deleteUser)
}