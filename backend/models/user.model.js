const mongoose = require('mongoose');
mongoose.pluralize(null);

const UserSchema = mongoose.Schema(
{
    email: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, default: "user"},
    token: { type: String, default: ""},
    image: {type: String, required: false},
    crypto: { type: [ _id= {type: mongoose.Schema.Types.ObjectId, ref: 'Crypto'} ]},
});

module.exports = mongoose.model('Users', UserSchema);