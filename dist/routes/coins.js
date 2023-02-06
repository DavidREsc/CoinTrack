"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var coins_1 = require("../controllers/coins");
var router = express_1.default.Router();
router.get('/', coins_1.getCoins);
router.get('/:id', coins_1.getCoin);
router.get('/:id/:period', coins_1.getCoinHistory);
exports.default = router;
