import { KarryngoApp } from "./karryngo_core/KarryngoApp";


const express = require('express');
var cors = require('cors');
const app = express();
let bodyParser = require('body-parser');  //librairie qui permet de parser une chaîne en JSON

app.use(cors())

// Import routes
let karryngoApp=new KarryngoApp();
karryngoApp.run();
//var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));    //ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.json({limit: '50mb'}));                           //ceci permet de gérer les tailles des json en entrée très grand


// Setup server port
var port = process.env.PORT || 8090;

// Send message for default URL
app.use(express.json())
app.get('/', (req:any, res:any) => res.send('Hello World with Express'));

// Use Api routes in the App
//app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Karryngo on port " + port);
});
