import "reflect-metadata";

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

const app = express();

import {adminBro, router} from "./adminbro";

app.use(adminBro.options.rootPath, router);

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
        app.listen(this.port);
        console.log(`started on port ${this.port}`);
    }
}

new Server();

export = app;