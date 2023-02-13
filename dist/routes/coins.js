"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coins_1 = require("../controllers/coins");
const router = express_1.default.Router();
router.get('/', coins_1.getCoins);
router.get('/:id', coins_1.getCoin);
router.get('/:id/:period', coins_1.getCoinHistory);
exports.default = router;
