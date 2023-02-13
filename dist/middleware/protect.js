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
exports.protect = void 0;
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
// Verifies jwt token
exports.protect = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.CTtoken;
    if (!token)
        return next(new errorResponse_1.default(200, 'Not authorized to access this route'));
    const blackListedToken = yield db_1.default.query('SELECT * FROM jwt_blacklist WHERE jwt = $1', [token]);
    if (blackListedToken.rows.length)
        return next(new errorResponse_1.default(401, 'Not authorized to access this route'));
    const secret = process.env.JWTSECRET;
    const payload = jsonwebtoken_1.default.verify(token, secret);
    req.body.user = payload;
    next();
}));
