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
exports.deleteTransactions = exports.deleteTransaction = exports.editTransaction = exports.createTransaction = exports.getTransactions = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const db_1 = __importDefault(require("../db"));
exports.getTransactions = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body.user;
    const buyTransactions = yield db_1.default.query('SELECT transaction_id, transactions.portfolio_id, transaction_type, coin_id, coin_price, coin_amount, transaction_date ' +
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 and transaction_type = $2 ORDER BY transaction_date', [user_id, 'buy']);
    const sellTransactions = yield db_1.default.query('SELECT transaction_id, transactions.portfolio_id, transaction_type, coin_id, coin_price, coin_amount, transaction_date ' +
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 and transaction_type = $2 ORDER BY transaction_date', [user_id, 'sell']);
    const data = {
        buyTransactions: buyTransactions.rows,
        sellTransactions: sellTransactions.rows,
        portfolios: req.body.portfolios || []
    };
    res.status(200).json({
        success: true,
        data
    });
}));
exports.createTransaction = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type } = req.body;
    const transaction = yield db_1.default.query('INSERT INTO transactions (portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type) ' +
        'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type]);
    res.status(201).json({
        success: true,
        data: transaction.rows[0]
    });
}));
exports.editTransaction = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { coin_amount, coin_price, transaction_date, transaction_type } = req.body;
    const { id } = req.params;
    const transaction = yield db_1.default.query('UPDATE transactions SET (coin_amount, coin_price, transaction_date, transaction_type) ' +
        '= ($1, $2, $3, $4) WHERE transaction_id = $5 RETURNING *', [coin_amount, coin_price, transaction_date, transaction_type, id]);
    res.status(200).json({
        success: true,
        data: transaction.rows[0]
    });
}));
exports.deleteTransaction = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.default.query('DELETE FROM transactions WHERE transaction_id = $1', [id]);
    res.status(200).json({
        success: true,
        data: {}
    });
}));
exports.deleteTransactions = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolio_id, coin_id } = req.body;
    yield db_1.default.query('DELETE FROM transactions WHERE portfolio_id = $1 AND coin_id = $2', [portfolio_id, coin_id]);
    res.status(200).json({
        sucess: true,
        data: {}
    });
}));
