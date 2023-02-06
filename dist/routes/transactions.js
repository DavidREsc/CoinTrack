"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var protect_1 = require("../middleware/protect");
var transactions_1 = require("../controllers/transactions");
var router = express_1.default.Router();
router.get('/', protect_1.protect, transactions_1.getTransactions);
router.post('/', protect_1.protect, transactions_1.createTransaction);
router.patch('/:id', protect_1.protect, transactions_1.editTransaction);
router.delete('/:id', protect_1.protect, transactions_1.deleteTransaction);
router.delete('/', protect_1.protect, transactions_1.deleteTransactions);
exports.default = router;
