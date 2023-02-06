"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
// Error handling middleware
var errorHandler = function (e, req, res, next) {
    console.log(chalk_1.default.red(e));
    res.status(500).json({
        success: false,
        error: e.message
    });
};
exports.default = errorHandler;
