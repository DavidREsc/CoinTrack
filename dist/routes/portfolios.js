"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolios_1 = require("../controllers/portfolios");
const transactions_1 = require("../controllers/transactions");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get('/', protect_1.protect, portfolios_1.getPortfolios, transactions_1.getTransactions);
router.post('/', protect_1.protect, portfolios_1.createPortfolio);
router.delete('/:id', protect_1.protect, portfolios_1.deletePortfolio);
exports.default = router;
