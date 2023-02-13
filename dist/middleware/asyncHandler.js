"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Call with controller function as parameter
// Catches errors without the need for a try-catch block and calls next
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.default = asyncHandler;
