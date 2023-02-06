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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoLogin = exports.logout = exports.login = exports.register = void 0;
var asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
var errorResponse_1 = __importDefault(require("../utils/errorResponse"));
var hashPassword_1 = __importDefault(require("../utils/hashPassword"));
var sendJwtResponse_1 = __importDefault(require("../utils/sendJwtResponse"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var express_validator_1 = require("express-validator");
var db_1 = __importDefault(require("../db"));
exports.register = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, validationError, existingUser, hashedPassword, client, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                validationError = (0, express_validator_1.validationResult)(req);
                if (!validationError.isEmpty())
                    return [2 /*return*/, next(new errorResponse_1.default(400, validationError.array()[0].msg))
                        // Check for existing user
                    ];
                return [4 /*yield*/, db_1.default.query('SELECT user_email FROM users WHERE user_email = $1', [email])];
            case 1:
                existingUser = _a.sent();
                if (existingUser.rows.length)
                    return [2 /*return*/, next(new errorResponse_1.default(409, "Email is already in use by another account"))
                        // Hash password and create a new user
                    ];
                return [4 /*yield*/, (0, hashPassword_1.default)(password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, db_1.default.connect()];
            case 3:
                client = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 9, , 11]);
                return [4 /*yield*/, client.query('BEGIN')];
            case 5:
                _a.sent();
                return [4 /*yield*/, client.query('INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING user_email, user_id', [email, hashedPassword])];
            case 6:
                newUser = _a.sent();
                return [4 /*yield*/, client.query('INSERT INTO portfolios (portfolio_name, user_id, main) VALUES ($1, $2, $3)', ['Main', newUser.rows[0].user_id, 't'])];
            case 7:
                _a.sent();
                return [4 /*yield*/, client.query('COMMIT')];
            case 8:
                _a.sent();
                client.release();
                (0, sendJwtResponse_1.default)(newUser.rows[0], 201, res);
                return [3 /*break*/, 11];
            case 9:
                error_1 = _a.sent();
                return [4 /*yield*/, client.query('ROLLBACK')];
            case 10:
                _a.sent();
                client.release();
                next(error_1);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
exports.login = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, validationError, user, verifiedPassword, _a, user_email, user_id;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                validationError = (0, express_validator_1.validationResult)(req);
                if (!validationError.isEmpty())
                    return [2 /*return*/, next(new errorResponse_1.default(400, validationError.array()[0].msg))
                        // Retrieve user
                    ];
                return [4 /*yield*/, db_1.default.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email])];
            case 1:
                user = _b.sent();
                if (!user.rows.length)
                    return [2 /*return*/, next(new errorResponse_1.default(400, 'Incorrect email or password'))
                        // Verify password is correct
                    ];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.rows[0].user_password)];
            case 2:
                verifiedPassword = _b.sent();
                if (!verifiedPassword)
                    return [2 /*return*/, next(new errorResponse_1.default(400, 'Incorrect email or password'))
                        // Create a jwt token and send a response
                    ];
                _a = user.rows[0], user_email = _a.user_email, user_id = _a.user_id;
                (0, sendJwtResponse_1.default)({ user_email: user_email, user_id: user_id }, 200, res);
                return [2 /*return*/];
        }
    });
}); });
exports.logout = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, blackListedToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.cookies.CTtoken;
                return [4 /*yield*/, db_1.default.query('INSERT INTO jwt_blacklist (jwt) VALUES ($1) RETURNING *', [token])];
            case 1:
                blackListedToken = _a.sent();
                if (!blackListedToken.rows.length)
                    return [2 /*return*/, next(new errorResponse_1.default(500, 'Logout failed'))
                        // Remove cookie from client
                    ];
                // Remove cookie from client
                res.cookie('CTtoken', 'none', {
                    expires: new Date(1),
                    httpOnly: true
                });
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); });
exports.demoLogin = (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, verifiedPassword, _a, user_email, user_id;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = 'davidrapalae@gmail.com';
                password = 'admin123*!@#$%^$$#@';
                return [4 /*yield*/, db_1.default.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email])];
            case 1:
                user = _b.sent();
                if (!user.rows.length)
                    return [2 /*return*/, next(new errorResponse_1.default(400, 'Incorrect email or password'))
                        // Verify password is correct
                    ];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.rows[0].user_password)];
            case 2:
                verifiedPassword = _b.sent();
                if (!verifiedPassword)
                    return [2 /*return*/, next(new errorResponse_1.default(400, 'Incorrect email or password'))
                        // Create a jwt token and send a response
                    ];
                _a = user.rows[0], user_email = _a.user_email, user_id = _a.user_id;
                (0, sendJwtResponse_1.default)({ user_email: user_email, user_id: user_id }, 200, res);
                return [2 /*return*/];
        }
    });
}); });
