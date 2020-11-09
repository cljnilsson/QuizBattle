import "reflect-metadata";

import path from "path";
import ngrok from "ngrok";

import express from "express";
import http from "http";

import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

import "./db/core";

const app = express();
const server = http.createServer(app);


require('dotenv').config({path:join('../.env')});

function join(dir) {
    return path.join(__dirname, dir);
}

function header(req, res, next) {
    res.setHeader("Content-Security-Policy", "connect-src 'self' ws:");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

class Server {
	_url : string;

    get port() {
        return process.env.PORT || 3000;;
    }

    get url() {
        return this._url;
    }

    constructor() {
        this.dependencies()
        this.middleware();
        this.startup()
    }

    dependencies() {
    }

    middleware() {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(header);
        app.use(helmet());
        app.use(bodyParser.json());
        //app.use(compression());
        app.use(express.static(__dirname + "/public"));
    }

    async startup() {
        server.listen(this.port);
        console.log(`started on port ${this.port}`);
        await this.setupPublicPreview();
        console.log("Public url: " + this.url);
    }

    async setupPublicPreview() {
        this._url = await ngrok.connect({
            addr: process.env.PORT,
            region: "eu"
        });
    }
}


let webServer = new Server();

export default app;
export {app};