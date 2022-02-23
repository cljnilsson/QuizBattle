"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("./core"));
const account_1 = __importDefault(require("./models/account"));
core_1.default.addSubscriber(test);
async function test() {
    let users = await core_1.default.get(account_1.default);
    if (users.length === 0) {
        core_1.default.createUser({ name: "admin", pass: "admin" });
    }
}
