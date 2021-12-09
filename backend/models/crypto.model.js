const mongoose = require('mongoose');
mongoose.pluralize(null);

const CryptoSchema = mongoose.Schema(
{
    name: { type: String, required: true, defualt: "EURO"},
    url: { type: String, required: true},
    code: { type: String, required: true, default: "EUR"}
});

module.exports = mongoose.model('Crypto', CryptoSchema);