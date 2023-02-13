"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var portfolios_1 = require("../controllers/portfolios");
var transactions_1 = require("../controllers/transactions");
var protect_1 = require("../middleware/protect");
var router = express_1.default.Router();
router.get('/', protect_1.protect, portfolios_1.getPortfolios, transactions_1.getTransactions);
router.post('/', protect_1.protect, portfolios_1.createPortfolio);
router.delete('/:id', protect_1.protect, portfolios_1.deletePortfolio);
exports.default = router;
