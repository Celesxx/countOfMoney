var cors = require('cors');
module.exports = function(app) {
 
    app.use(cors());
    var cryptoController = require('../controllers/crypto.controller.js');

    app.get('/cryptos', cryptoController.listCryptos);
    // app.get('/cryptos[?cmids=:id]', cryptoController.createUser);
    // app.get('/cryptos/:id', cryptoController.getUserByMail)
    // app.get('/cryptos/:id/history/:period', cryptoController.getUser);
    app.post('/cryptos', cryptoController.createCrypto);
    // app.delete('/cryptos/:id', cryptoController.deleteUser);
}