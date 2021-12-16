const mongoose = require('mongoose');
mongoose.pluralize(null);

const CryptoSchema = mongoose.Schema(
{
    name: { type: String, required: true, default: "Bitcoin", unique: true},
    url: { type: String, required: true},
    code: { type: String, required: true, default: "bitcoin", unique: true}
});

module.exports = mongoose.model('Crypto', CryptoSchema);