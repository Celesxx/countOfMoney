var express = require('express');
var app = express();
const mongoose = require('mongoose');
require("dotenv").config();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded(
{
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));


    
// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(async() => { console.log("Successfully connected to MongoDB."); })
.catch(err => 
{
    console.log('Could not connect to MongoDB.')
    console.log(err)
    process.exit()
});

require('./routeur/user.router.js')(app)
require('./routeur/login.router.js')(app)
require('./routeur/crypto.router.js')(app)

var server = app.listen(process.env.PORT || 4000, function () 
{ 
  var port = server.address().port    
  console.log("App listening at http://localhost:%s", port) 
})

module.exports = server;