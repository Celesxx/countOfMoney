module.exports = function(app) {

    var userController = require('../controllers/user.controller.js')
    var loginController = require('../controllers/login.controller.js');

    app.post('/users/register', userController.createUser)
    app.post('/users/login', loginController.getLogin)
    app.post('/users/logout/:id', userController.logoutUser)

    app.get('/users/getUserByMail', userController.getUserByMail)
    app.get('/users/', userController.getUsers)
    app.get('/users/profile/:id', userController.getUser)

    app.put('/users/profile/:id', userController.updateUser)

    app.delete('/users/:id', userController.deleteUser)
}