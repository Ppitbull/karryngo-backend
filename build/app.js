"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KarryngoApp_1 = require("./karryngo_core/KarryngoApp");
const injector_container_1 = require("./karryngo_core/lifecycle/injector_container");
const express = require('express');
var cors = require('cors');
const app = express();
let bodyParser = require('body-parser'); //librairie qui permet de parser une chaîne en JSON
let router = express.Router();
const httpServer = require("http").createServer(app);
app.use(cors());
//instanciation du coeur de Karryngo
let karryngoApp = injector_container_1.InjectorContainer.getInstance().getInstanceOf(KarryngoApp_1.KarryngoApp);
karryngoApp.init(router, httpServer, app);
app.use(((request, response, next) => {
    karryngoApp.run();
    next();
}));
//ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.json({ limit: '50mb' }));
//utilisation du router
app.use(router);
// Setup server port
var port = process.env.PORT;
// Send message for default URL
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
//app.use('/api', apiRoutes)
// Launch app to listen to specified port
httpServer.listen(port, function () {
    console.log("Running Karryngo on port " + port);
});
