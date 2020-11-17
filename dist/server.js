"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const ngrok_1 = __importDefault(require("ngrok"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const adminbro_1 = require("./adminbro");
app.use(adminbro_1.adminBro.options.rootPath, adminbro_1.router);
require('dotenv').config({ path: join('../.env') });
function join(dir) {
    return path_1.default.join(__dirname, dir);
}
function header(req, res, next) {
    res.setHeader("Content-Security-Policy", "connect-src 'self' ws:");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
class Server {
    constructor() {
        this.dependencies();
        this.middleware();
        this.startup();
    }
    get port() {
        return process.env.PORT || 3000;
        ;
    }
    get url() {
        return this._url;
    }
    dependencies() {
    }
    middleware() {
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(header);
        app.use(helmet_1.default());
        app.use(body_parser_1.default.json());
        app.use(express_1.default.static(__dirname + "/public"));
    }
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            app.listen(this.port);
            console.log(`started on port ${this.port}`);
            yield this.setupPublicPreview();
            console.log("Public url: " + this.url);
        });
    }
    setupPublicPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            this._url = yield ngrok_1.default.connect({
                addr: process.env.PORT,
                region: "eu"
            });
        });
    }
}
new Server();
module.exports = app;
