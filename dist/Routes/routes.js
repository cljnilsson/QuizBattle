"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = __importDefault(require("../server.js"));
server_js_1.default.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
server_js_1.default.get("/test", (req, res) => {
    console.log("happens");
    console.log("BABB!!!!!!!!!!");
    res.json({ message: "Hello, client!!!!!!!!" });
});
