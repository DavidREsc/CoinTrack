"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Sign and return a new JWT token
var createJwt = function (user) {
    var secret = process.env.JWTSECRET;
    return jsonwebtoken_1.default.sign(user, secret, {
        expiresIn: '5h'
    });
};
exports.default = createJwt;
