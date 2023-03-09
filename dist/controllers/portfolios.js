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
exports.deletePortfolio = exports.createPortfolio = exports.getPortfolios = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const db_1 = __importDefault(require("../db"));
exports.getPortfolios = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body.user;
    const portfolios = yield db_1.default.query('SELECT portfolio_name, portfolio_id, main FROM portfolios WHERE user_id = $1', [user_id]);
    req.body.portfolios = portfolios.rows;
    next();
}));
exports.createPortfolio = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body.user;
    const portfolio_name = req.body.portfolio_name;
    const portfolio = yield db_1.default.query('INSERT INTO portfolios (portfolio_name, user_id) VALUES ($1, $2) RETURNING portfolio_id, portfolio_name, main', [portfolio_name, user_id]);
    res.status(201).json({
        success: true,
        data: portfolio.rows[0]
    });
}));
exports.deletePortfolio = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield db_1.default.connect();
    try {
        yield client.query('BEGIN');
        yield client.query('DELETE FROM transactions WHERE portfolio_id = $1', [id]);
        yield client.query('DELETE FROM portfolios WHERE portfolio_id = $1', [id]);
        yield client.query('COMMIT');
        client.release();
        res.status(200).json({
            success: true,
            data: []
        });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        client.release();
        next(error);
    }
}));
