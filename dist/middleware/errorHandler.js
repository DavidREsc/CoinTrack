"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
// Error handling middleware
const errorHandler = (e, req, res, next) => {
    console.log(chalk_1.default.red(e, e.statusCode));
    res.status(e.statusCode || 500).json({
        success: false,
        error: e.message
    });
};
exports.default = errorHandler;
