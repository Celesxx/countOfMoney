const mongoose = require('mongoose');
mongoose.pluralize(null);

const CryptoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        gecko: {
            type: String,
            required: true,
            unique: true,
        },
        symbol: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true
        },
        genesis_date: String,
        description: String,
        homepage: String,
        market_data: {
            type: Map,
            required: true
        },
        last_updated: Date,
        rank: {
            type: Number,
            required: true
        },
        history: {
            type: Map,
            required: true,
        },
        markets: {
            type: Map,
            required: true,
        },
    })

module.exports = mongoose.model('Crypto', CryptoSchema);
