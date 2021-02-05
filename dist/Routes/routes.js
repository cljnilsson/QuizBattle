"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../db/generate");
const server_1 = __importDefault(require("../server"));
server_1.default.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
server_1.default.get("/*", (req, res) => {
    res.redirect("/");
});
