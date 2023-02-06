"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createJwt_1 = __importDefault(require("./createJwt"));
// Creates jwt token, stores in cookie, and sends back a response
var sendJwtResponse = function (user, statusCode, res) {
    var CTtoken = (0, createJwt_1.default)(user);
    var cookieOptions = {
        expires: new Date(Date.now() + (5 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: false
    };
    return res.status(statusCode)
        .cookie('CTtoken', CTtoken, cookieOptions)
        .json({
        success: true,
        user: user.user_email
    });
};
exports.default = sendJwtResponse;
