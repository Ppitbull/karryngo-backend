"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KarryngoApp_1 = require("./karryngo_core/KarryngoApp");
const injector_container_1 = require("./karryngo_core/lifecycle/injector_container");
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const app = (0, express_1.default)();
let bodyParser = require('body-parser'); //librairie qui permet de parser une chaîne en JSON
let router = express_1.default.Router();
const httpServer = require("http").createServer(app);
var timeout = require('connect-timeout');
// By Landry
const io = require('socket.io')(httpServer, {
    cors: {
        origins: ['*']
    }
});
//By Landry
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
        console.log('message: ' + msg['a']);
        io.emit('my broadcast', { "server": msg });
    });
});
////////////
// ENd By landry
app.use(timeout('120s'));
app.use(cors());
//ceci permet de gérer les tailles des json en entrée très grand
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
//utilisation du router
app.use(router);
// Setup server port
var port = process.env.PORT || 8090;
// Send message for default URL 
app.use(express_1.default.json());
//instanciation du coeur de Karryngo
let karryngoApp = injector_container_1.InjectorContainer.getInstance().getInstanceOf(KarryngoApp_1.KarryngoApp);
karryngoApp.init(router, httpServer, app);
app.use(((request, response, next) => {
    karryngoApp.run();
    next();
}));
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
httpServer.listen(port, function () {
    console.log("Running Karryngo on port " + port);
});
