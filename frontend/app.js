'use strict';

var express    = require('express');
var fs         = require('fs');
var bodyParser = require('body-parser');
var path       = require('path');
var cors       = require("cors");
var http       = require('http');
var methodOverride = require('method-override');
var engines = require('consolidate');
var https = require('https');

var app = express();

// Starting both http & https servers
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);


app.use(cors());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
// to support JSON-encoded bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(function(req, res, next) {
    // Put some preprocessing here.
    res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.info(req.method + ' ' + req.url + ' body ' + JSON.stringify(req.body) + ' params ' + JSON.stringify(req.params));
    next();
});

//Router Initialize
var router = express.Router();


app.use(router);

//Routes
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

 httpServer.listen(5000, () => {
 	console.log('HTTP Server running on port 5000');
 });

exports = module.exports = app;
