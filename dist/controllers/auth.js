"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoLogin = exports.logout = exports.login = exports.register = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const sendJwtResponse_1 = __importDefault(require("../utils/sendJwtResponse"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../db"));
exports.register = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    // Check for body validation errors
    const validationError = express_validator_1.validationResult(req);
    if (!validationError.isEmpty())
        return next(new errorResponse_1.default(400, validationError.array()[0].msg));
    // Check for existing user
    const existingUser = yield db_1.default.query('SELECT user_email FROM users WHERE user_email = $1', [email]);
    if (existingUser.rows.length)
        return next(new errorResponse_1.default(409, "Email is already in use by another account"));
    // Hash password and create a new user
    const hashedPassword = yield hashPassword_1.default(password);
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        const newUser = yield client.query('INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING user_email, user_id', [email, hashedPassword]);
        yield client.query('INSERT INTO portfolios (portfolio_name, user_id, main) VALUES ($1, $2, $3)', ['Main', newUser.rows[0].user_id, 't']);
        yield client.query('COMMIT');
        client.release();
        sendJwtResponse_1.default(newUser.rows[0], 201, res);
    }
    catch (error) {
        yield client.query('ROLLBACK');
        client.release();
        next(error);
    }
}));
exports.login = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    // Check for body validation errors
    const validationError = express_validator_1.validationResult(req);
    if (!validationError.isEmpty())
        return next(new errorResponse_1.default(400, validationError.array()[0].msg));
    // Retrieve user
    const user = yield db_1.default.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email]);
    if (!user.rows.length)
        return next(new errorResponse_1.default(400, 'Incorrect email or password'));
    // Verify password is correct
    const verifiedPassword = yield bcryptjs_1.default.compare(password, user.rows[0].user_password);
    if (!verifiedPassword)
        return next(new errorResponse_1.default(400, 'Incorrect email or password'));
    // Create a jwt token and send a response
    const { user_email, user_id } = user.rows[0];
    sendJwtResponse_1.default({ user_email, user_id }, 200, res);
}));
exports.logout = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.CTtoken;
    // Blacklist the token
    const blackListedToken = yield db_1.default.query('INSERT INTO jwt_blacklist (jwt) VALUES ($1) RETURNING *', [token]);
    if (!blackListedToken.rows.length)
        return next(new errorResponse_1.default(500, 'Logout failed'));
    // Remove cookie from client
    res.cookie('CTtoken', 'none', {
        expires: new Date(1),
        httpOnly: true
    });
    res.status(200).send();
}));
exports.demoLogin = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'davidrapalae@gmail.com';
    const password = 'admin123*!@#$%^$$#@';
    // Retrieve user
    const user = yield db_1.default.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email]);
    if (!user.rows.length)
        return next(new errorResponse_1.default(400, 'Incorrect email or password'));
    // Verify password is correct
    const verifiedPassword = yield bcryptjs_1.default.compare(password, user.rows[0].user_password);
    if (!verifiedPassword)
        return next(new errorResponse_1.default(400, 'Incorrect email or password'));
    // Create a jwt token and send a response
    const { user_email, user_id } = user.rows[0];
    sendJwtResponse_1.default({ user_email, user_id }, 200, res);
}));
