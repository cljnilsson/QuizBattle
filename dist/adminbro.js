"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.adminBro = void 0;
const admin_bro_1 = __importDefault(require("admin-bro"));
const express_1 = __importDefault(require("@admin-bro/express"));
const adminBro = new admin_bro_1.default({
    resources: [],
    rootPath: "/admin",
});
exports.adminBro = adminBro;
const router = express_1.default.buildRouter(adminBro);
exports.router = router;
