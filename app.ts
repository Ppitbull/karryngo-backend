
import { Server } from "socket.io";
import { KarryngoApp } from "./karryngo_core/KarryngoApp";
import { InjectorContainer } from "./karryngo_core/lifecycle/injector_container";
import { ActionResult } from "./karryngo_core/utils/ActionResult";

import express from 'express';
var cors = require('cors');
const app = express();
let bodyParser = require('body-parser');  //librairie qui permet de parser une chaîne en JSON
let router=express.Router();
const httpServer = require("http").createServer(app);
var timeout = require('connect-timeout')

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}
app.use(timeout('120s'))

app.use(cors())
app.use(haltOnTimedout)
//instanciation du coeur de Karryngo
let karryngoApp = InjectorContainer.getInstance().getInstanceOf<KarryngoApp>(KarryngoApp)
karryngoApp.init(router,httpServer,app);
app.use(((request:any,response:any,next:any)=>
{
    karryngoApp.run();

    next();
}));

app.use(haltOnTimedout)
//ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.json({limit: '50mb'}));

//utilisation du router
app.use(router);
app.use(haltOnTimedout)
// Setup server port
var port = process.env.PORT || 8090;

// Send message for default URL 
app.use(express.json())
app.get('/', (req:any, res:any) => res.send('Hello World with Express'));
app.use(haltOnTimedout)

// Use Api routes in the App
//app.use('/api', apiRoutes)

// Launch app to listen to specified port
httpServer.listen(port, function () {
    console.log("Running Karryngo on port " + port);
});
