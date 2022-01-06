module.exports = function(app) {
    var cryptoController = require('../controllers/crypto.controller.js');

    app.post('/cryptos', cryptoController.createCrypto);
    app.get('/cryptos', cryptoController.listCryptos);
    app.get('/cryptos/:id', cryptoController.GetById);
    app.get('/cryptos/:id/history/:period', cryptoController.GetByHistory);
    app.get('/cryptos/:id/date/:period', cryptoController.GetByDate);
    app.delete('/cryptos/:id', cryptoController.deleteCrypto);
}