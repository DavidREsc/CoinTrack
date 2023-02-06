"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var portfolio_1 = require("../controllers/portfolio");
var protect_1 = require("../middleware/protect");
var router = express_1.default.Router();
router.get('/', protect_1.protect, portfolio_1.getPortfolios);
router.post('/', protect_1.protect, portfolio_1.createPortfolio);
router.delete('/:id', protect_1.protect, portfolio_1.deletePortfolio);
exports.default = router;
