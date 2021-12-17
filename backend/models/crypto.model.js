const mongoose = require('mongoose');
mongoose.pluralize(null);

const CryptoSchema = mongoose.Schema(
{
    name: { type: String, required: true, default: "EURO"},
    url: { type: String, required: true},
    code: { type: String, required: true, default: "EUR"},
    visible: {type : Boolean, default: true}
});

module.exports = mongoose.model('Crypto', CryptoSchema);